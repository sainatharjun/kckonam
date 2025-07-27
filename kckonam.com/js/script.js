// Initialize map carousel for mobile
$(document).ready(function () {
  function initMapCarousel() {
    if (window.innerWidth <= 768) {
      if (!$(".map-carousel").hasClass("slick-initialized")) {
        $(".map-carousel").slick({
          dots: false,
          arrows: true,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          prevArrow:
            '<button type="button" class="slick-prev custom-map-arrow"><span>&#8592;</span></button>',
          nextArrow:
            '<button type="button" class="slick-next custom-map-arrow"><span>&#8594;</span></button>',
        });
      }
    } else {
      if ($(".map-carousel").hasClass("slick-initialized")) {
        $(".map-carousel").slick("unslick");
      }
    }
  }
  initMapCarousel();
  $(window).on("resize", function () {
    initMapCarousel();
  });
});

function phonenumber(evt) {
  // Only ASCII character in that range allowed
  var val = document.getElementById("phone").value;
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (
    (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ||
    val.length >= 10
  )
    evt.preventDefault();
  return;
  return true;
}

function confirmation() {
  if (document.getElementById("confirm").checked == true) {
    document.getElementById("submit").disabled = false;
  } else {
    document.getElementById("submit").disabled = true;
  }
}

function saveChanges(collection) {
  var s11 = document.getElementById("s11").value;
  var s12 = document.getElementById("s12").value;
  var s1 = document.getElementById("s1").value;
  var s2 = document.getElementById("s2").value;
  var s3 = document.getElementById("s3").value;
  db.collection(collection).doc("11").update({
    seats: s11,
  });
  db.collection(collection).doc("12").update({
    seats: s12,
  });
  db.collection(collection).doc("1").update({
    seats: s1,
  });
  db.collection(collection).doc("2").update({
    seats: s2,
  });
  db.collection(collection).doc("3").update({
    seats: s3,
  });
  alert("Changes Saved Successfully");
}

function getSlotData(collection) {
  var data = "";
  var s11;
  var s12;
  var s1;
  var s2;
  var s3;
  db.collection(collection)
    .get()
    .then(function (s) {
      s.forEach(function (x) {
        if (x.data().slotID == "1200") {
          s11 = x.data().seats;
        } else if (x.data().slotID == "1245") {
          s12 = x.data().seats;
        } else if (x.data().slotID == "0130") {
          s1 = x.data().seats;
        } else if (x.data().slotID == "0215") {
          s2 = x.data().seats;
        } else if (x.data().slotID == "0300") {
          s3 = x.data().seats;
        }
      });

      data =
        "<table class='table table-striped'> <tr><th>Slot</th><th>Seats Remaining</th></tr> <tr><td>11:00 AM</td><td> <input id='s11' class='form-control' type='number' value=" +
        s11 +
        "> </td></tr> <tr><td>12:00 PM</td><td> <input id='s12' class='form-control' type='number' value=" +
        s12 +
        "> </td></tr> <tr><td>1:00 PM</td><td> <input id='s1' class='form-control' type='number' value=" +
        s1 +
        "> </td></tr> <tr><td>2:00 PM</td><td> <input id='s2' class='form-control' type='number' value=" +
        s2 +
        "> </td></tr> <tr><td>3:00 PM</td><td> <input id='s3' class='form-control' type='number' value=" +
        s3 +
        "> </td></tr> </table>";
      document.getElementById("modal-body").innerHTML = data;
      document
        .getElementById("save")
        .setAttribute("onclick", "saveChanges('" + collection + "')");
      var title = "";
      if (collection == "20-slots-chennai") {
        title = "Slot Management - 20th August, Chennai";
      } else if (collection == "21-slots-chennai") {
        title = "Slot Management - 21st August, Chennai";
      } else if (collection == "20-slots-banglore") {
        title = "Slot Management - 20th August, Banglore";
      } else if (collection == "21-slots-banglore") {
        title = "Slot Management - 21st August, Banglore";
      }
      document.getElementById("modal-title").innerHTML = title;
    });
}

function getBookings() {
  var chennai20 =
    "<table class='table table-striped'><tr><th>Booking ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Slot</th><th>No. of people</th><th>Comments</th></tr>";
  var chennai21 =
    "<table class='table table-striped'><tr><th>Booking ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Slot</th><th>No. of people</th><th>Comments</th></tr>";
  var banglore20 =
    "<table class='table table-striped'><tr><th>Booking ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Slot</th><th>No. of people</th><th>Comments</th></tr>";
  var banglore21 =
    "<table class='table table-striped'><tr><th>Booking ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Slot</th><th>No. of people</th><th>Comments</th></tr>";
  db.collection("Bookings")
    .get()
    .then(function (s) {
      console.log(s);
      s.forEach(function (x) {
        if (x.data().reservationDate == "20") {
          if (x.data().city == "chennai") {
            chennai20 =
              chennai20 +
              "<tr><td>" +
              x.data().bookingID +
              "</td><td>" +
              x.data().name +
              "</td><td>" +
              x.data().email +
              "</td><td>" +
              x.data().phone +
              "</td><td>" +
              x.data().timeSlot +
              "</td><td>" +
              x.data().numberOfPeople +
              "</td><td>" +
              x.data().questionsAndComments +
              "</td></tr>";
          }
          if (x.data().city == "banglore") {
            banglore20 =
              banglore20 +
              "<tr><td>" +
              x.data().bookingID +
              "</td><td>" +
              x.data().name +
              "</td><td>" +
              x.data().email +
              "</td><td>" +
              x.data().phone +
              "</td><td>" +
              x.data().timeSlot +
              "</td><td>" +
              x.data().numberOfPeople +
              "</td><td>" +
              x.data().questionsAndComments +
              "</td></tr>";
          }
        }
        if (x.data().reservationDate == "21") {
          if (x.data().city == "chennai") {
            chennai21 =
              chennai21 +
              "<tr><td>" +
              x.data().bookingID +
              "</td><td>" +
              x.data().name +
              "</td><td>" +
              x.data().email +
              "</td><td>" +
              x.data().phone +
              "</td><td>" +
              x.data().timeSlot +
              "</td><td>" +
              x.data().numberOfPeople +
              "</td><td>" +
              x.data().questionsAndComments +
              "</td></tr>";
          }
          if (x.data().city == "banglore") {
            banglore21 =
              banglore21 +
              "<tr><td>" +
              x.data().bookingID +
              "</td><td>" +
              x.data().name +
              "</td><td>" +
              x.data().email +
              "</td><td>" +
              x.data().phone +
              "</td><td>" +
              x.data().timeSlot +
              "</td><td>" +
              x.data().numberOfPeople +
              "</td><td>" +
              x.data().questionsAndComments +
              "</td></tr>";
          }
        }
      });

      chennai20 = chennai20 + "</table>";
      chennai21 = chennai21 + "</table>";
      banglore20 = banglore20 + "</table>";
      banglore21 = banglore21 + "</table>";
      document.getElementById("chennai20").innerHTML = chennai20;
      document.getElementById("chennai21").innerHTML = chennai21;
      document.getElementById("banglore20").innerHTML = banglore20;
      document.getElementById("banglore21").innerHTML = banglore21;
    });
}

function checkSlot() {
  var allclear = 0;
  var remSeats;
  var name = document.getElementById("name").value;
  var seat = document.getElementById("seats").value;
  var slot = document.getElementById("slot").value;
  var city = document.getElementById("city").value;
  var phone = document.getElementById("phone").value;
  var qac = document.getElementById("qac").value;
  var email = document.getElementById("email").value;
  var rDate = document.getElementById("rDate").value;
  if (
    name == "" ||
    seat == "" ||
    slot == "def" ||
    city == "def" ||
    phone == "" ||
    email == "" ||
    rDate == "def"
  ) {
    alert("Please fill all fields");
    return;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  } else {
    alert("You have entered an invalid email address");
    return;
  }

  if (phone.length != 10) {
    alert("You have entered an invalid phone number");
    return;
  }

  db.collection(rDate + "-slots-" + city)
    .where("slotID", "==", slot)
    .get()
    .then(function (s) {
      s.forEach(function (x) {
        if (x.data().seats < seat) {
          alert("There are not enough seats in the slot.");
          return;
        } else {
          remSeats = x.data().seats;
          allclear = 1;
        }
      });
      if (allclear == 1) {
        var random = Math.floor(100 + Math.random() * 900);
        random = random.toString();
        var uid = rDate + slot + random;
        remSeats = remSeats - seat;
        db.collection(rDate + "-slots-" + city)
          .doc(slot)
          .update({
            seats: remSeats,
          });
        //  document.getElementById("sadhyaForm").submit();

        var docid = db.collection("Bookings").doc().id;
        db.collection("Bookings")
          .doc(docid)
          .set({
            bookingID: uid,
            name: name,
            city: city,
            email: email,
            numberOfPeople: seat,
            phone: phone,
            questionsAndComments: qac,
            reservationDate: rDate,
            timeSlot: slot,
          })
          .then(function () {
            alert("Booking completed successfully");
            window.location.href = "index.html";
          });
      }
    });
}
(function ($) {
  "use strict";

  /* ========================================================================= */
  /*	Page Preloader
  /* ========================================================================= */

  // window.load = function () {
  // 	document.getElementById('preloader').style.display = 'none';
  // }

  document.addEventListener("DOMContentLoaded", function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  });

  //Hero Slider
  $(".hero-slider").slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: "<button type='button' class='prevArrow'></button>",
    nextArrow: "<button type='button' class='nextArrow'></button>",
    dots: false,
    autoplaySpeed: 7000,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
  $(".hero-slider").slickAnimation();

  /* ========================================================================= */
  /*	Header Scroll Background Change
  /* ========================================================================= */

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll > 100) {
      //console.log('a');
      $(".navigation").addClass("sticky-header");
    } else {
      //console.log('a');
      $(".navigation").removeClass("sticky-header");
    }
  });

  /* ========================================================================= */
  /*	Portfolio Filtering Hook
  /* =========================================================================  */

  // filter
  setTimeout(function () {
    var containerEl = document.querySelector(".filtr-container");
    var filterizd;
    if (containerEl) {
      filterizd = $(".filtr-container").filterizr({});
    }
  }, 500);

  /* ========================================================================= */
  /*	Testimonial Carousel
  /* =========================================================================  */

  //Init the slider
  $(".testimonial-slider").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  /* ========================================================================= */
  /*	Clients Slider Carousel
  /* =========================================================================  */

  //Init the slider
  $(".clients-logo-slider").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
  });

  /* ========================================================================= */
  /*	Company Slider Carousel
  /* =========================================================================  */
  $(".company-gallery").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
  });

  /* ========================================================================= */
  /*   Contact Form Validating
  /* ========================================================================= */

  $("#contact-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 4,
      },
      email: {
        required: true,
        email: true,
      },
      subject: {
        required: false,
      },
      message: {
        required: true,
      },
    },
    messages: {
      user_name: {
        required: "Come on, you have a name don't you?",
        minlength: "Your name must consist of at least 2 characters",
      },
      email: {
        required: "Please put your email address",
      },
      message: {
        required: "Put some messages here?",
        minlength: "Your name must consist of at least 2 characters",
      },
    },
    submitHandler: function (form) {
      $(form).ajaxSubmit({
        type: "POST",
        data: $(form).serialize(),
        url: "sendmail.php",
        success: function () {
          $("#contact-form #success").fadeIn();
        },
        error: function () {
          $("#contact-form #error").fadeIn();
        },
      });
    },
  });

  /* ========================================================================= */
  /*	On scroll fade/bounce effect
  /* ========================================================================= */
  var scroll = new SmoothScroll('a[href*="#"]');

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    if ($(".counter").length !== 0) {
      var oTop = $(".counter").offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $(".counter").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 1000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }
  // -----------------------------
  //  On Scroll
  // -----------------------------
  $(window).scroll(function () {
    counter();
  });
})(jQuery);

$(".scrollToMap").on("click", () => {
  document.getElementById("mapDiv").scrollIntoView({
    behavior: "smooth", // or "auto" or "instant"
    block: "start", // or "end"
  });
});
