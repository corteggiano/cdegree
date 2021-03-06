Template.diagramSidebar.events({
  "click .classes": function(event) {
    $("#overlay").fadeIn();
    Session.set("selectedCourse", event.currentTarget.dataset.id);
  },

  // filter list of classes in sidebar by search
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
  },

  // open course info when user clicks a course name in the sidebar
  'click .classes': function(event) {
      $('#overlay').fadeIn();

      // highlight prerequisites for this course
      // var course = Course.findOne({id: event.currentTarget.dataset.id});
      //
      // $('.prereq').removeClass("prereq");
      //
      // if(course) {
      //     course.prereqs.forEach(function(id) {
      //
      //         $('[data-id="'+id+'"]').addClass("prereq");
      //
      //     });
      // }

      Session.set('selectedCourse', event.currentTarget.dataset.id);
  },

  // collapse the sidebar
  'click .hide-button': function(event) {
      var sw = $('#sidebar').outerWidth();
      $('#sidebar').css("margin-left", -sw);
      $('#content').addClass("col-sm-12");
      $('#content').removeClass("col-sm-8");

      $('#overlay').addClass("col-sm-12");
      $('#overlay').removeClass("col-md-offset-4");
      $('#overlay').removeClass("col-md-8");

      $('.visualization-key').css("padding-left", "70px");

      $('.show-button').fadeIn();
  },

  // open the sidebar
  'click .show-button': function(event) {
      $('#sidebar').css("margin-left", "0");
      $('#content').addClass("col-sm-8");
      $('#content').removeClass("col-sm-12");

      $('#overlay').removeClass("col-sm-12");
      $('#overlay').addClass("col-md-offset-4");
      $('#overlay').addClass("col-md-8");

      $('.visualization-key').css("padding-left", "15px");

      $('.show-button').hide();
  },
});
