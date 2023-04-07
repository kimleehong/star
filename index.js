console.clear();

$(document).ready(function () {
  slide();
});

// Sidepanel open&close

function openNav() {
  document.getElementById("mySidepanel").style.width = "450px";
  document.getElementById("panel-bg").style.display = "block";
  $("body").addClass("overflowy-hidden");
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("panel-bg").style.display = "none";
  $("body").removeClass("overflowy-hidden");
}

// Sidepanel tab

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// 슬라이드
function slide() {
  var wid = 0;
  var now_num = 0;
  var slide_length = 0;
  var auto = null;
  var $dotli = $(".dot>li");
  var $panel = $(".panel");
  var $panelLi = $panel.children("li");

  // 변수 초기화
  function init() {
    wid = $(".slide").width();
    now_num = $(".dot>li.on").index();
    slide_length = $dotli.length;
  }

  // 이벤트 묶음
  function slideEvent() {
    // 슬라이드 하단 dot버튼 클릭했을때
    $dotli.click(function () {
      now_num = $(this).index();
      slideMove();
    });

    // 오토플레이
    autoPlay();

    // 오토플레이 멈춤
    autoPlayStop();

    // 오토플레이 재시작
    autoPlayRestart();

    // 화면크기 재설정 되었을때
    resize();
  }

  // 자동실행 함수
  function autoPlay() {
    auto = setInterval(function () {
      nextChkPlay();
    }, 5000);
  }

  // 자동실행 멈춤
  function autoPlayStop() {
    $panelLi.mouseenter(function () {
      clearInterval(auto);
    });
  }

  // 자동실행 멈췄다가 재실행
  function autoPlayRestart() {
    $panelLi.mouseleave(function () {
      auto = setInterval(function () {
        nextChkPlay();
      }, 5000);
    });
  }

  // 이전 버튼 클릭시 조건 검사후 슬라이드 무브
  function prevChkPlay() {
    if (now_num == 0) {
      now_num = slide_length - 1;
    } else {
      now_num--;
    }
    slideMove();
  }

  // 이후 버튼 클릭시 조건 검사후 슬라이드 무브
  function nextChkPlay() {
    if (now_num == slide_length - 1) {
      now_num = 0;
    } else {
      now_num++;
    }
    slideMove();
  }

  // 슬라이드 무브
  function slideMove() {
    $panel.stop().animate({
      "margin-left": -wid * now_num
    });
    $dotli.removeClass("on");
    $dotli.eq(now_num).addClass("on");
  }

  // 화면크기 조정시 화면 재설정
  function resize() {
    $(window).resize(function () {
      init();
      $panel.css({
        "margin-left": -wid * now_num
      });
    });
  }
  init();
  slideEvent();
}

function closeTooltip() {
  $(".sign-tooltip").css("display", "none");
}

$(".btn-tt-close").click(closeTooltip);

$(".btn-mobilemore").click(function () {
  $(".mobile-gamecard:last-child").css("display", "flex");
  $(".btn-mobilemore").css("display", "none");
});

$(".footer-2__world > div").click(function () {
  if ($(".foreign").hasClass("foreign-on")) {
    $(".foreign").removeClass("foreign-on");
  } else {
    $(".foreign").addClass("foreign-on");
  }
});

$(".footer-2__world").click(function () {
  return false;
});

$("body").click(function () {
  if ($(".foreign").hasClass("foreign-on")) {
    $(".foreign").removeClass("foreign-on");
  }
});

let scrollValue = 0;

$(".float-mini__youtube").mouseenter(function () {
  // console.log("마우스 올려짐");
  floatmenuOn();
  $(".float-mini__youtube").css("display", "none");
});

$(".float-menu__youtube").mouseleave(function () {
  if (scrollValue > 0) {
    // console.log("마우스 내려짐");
    $(".float-menu__youtube").css("display", "");
    $(".float-menu__youtube").css("margin-bottom", "");
    $(".float-mini__youtube").css("display", "");
  }
});

function floatmenuOn() {
  $(".float-menu__youtube").css("display", "block");
  $(".float-menu__youtube").css("margin-bottom", "130px");
}

$(window).scroll(function () {
  scrollValue = $(document).scrollTop();

  if (scrollValue == 0) {
    $(".float-mini").css("display", "none");
    $(".float-menu__youtube").css("display", "block");
  } else {
    $(".float-mini").css("display", "block");
    $(".float-menu__youtube").css("display", "none");
  }
});

$(window).scroll();


