
function BackTopPage() {
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0)
}

function myFunction() {
    var x = document.getElementById("menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
    console.log(a)
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }