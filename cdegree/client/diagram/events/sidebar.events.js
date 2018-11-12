Template.diagramSidebar.events({
  "click .classes": function(event) {
    $("#overlay").fadeIn();
    Session.set("selectedCourse", event.currentTarget.dataset.id);
  }
});
