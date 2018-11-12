Template.diagramSidebar.events({
  "click .classes": function(event) {
    $("#overlay").fadeIn();
    Session.set("selectedCourse", event.currentTarget.dataset.id);
  },
  "keyup #search-class": function(event) {
    let input, filter, d, i;
    input = document.getElementById("search-class");
    filter = input.value.toUpperCase();
    classList = document.getElementById("classes-remaining");
    d = classList.getElementsByTagName("div");
    for (i = 0; i < d.length; i++) {
      if (input === "") {
        d[i].style.display = "";
      } else if (d[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        d[i].style.display = "";
      } else {
        d[i].style.display = "none";
      }
    }
  }
});
