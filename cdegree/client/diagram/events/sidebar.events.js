Template.diagramSidebar.events({

  'click .classes': function(event) {
    $('#overlay').fadeIn();
      Session.set('selectedCourse', event.currentTarget.dataset.id);
  },

  'click .hide-button': function(event) {
      var sw = $('#sidebar').outerWidth();
      $('#sidebar').css("margin-left", -sw);
      $('#content').addClass("col-sm-12");
      $('#content').removeClass("col-sm-8");

      $('#overlay').addClass("col-sm-12");
      $('#overlay').removeClass("col-md-offset-4");
      $('#overlay').removeClass("col-md-8");

      $('.show-button').fadeIn();
  },

  'click .show-button': function(event) {
      $('#sidebar').css("margin-left", "0");
      $('#content').addClass("col-sm-8");
      $('#content').removeClass("col-sm-12");

      $('#overlay').removeClass("col-sm-12");
      $('#overlay').addClass("col-md-offset-4");
      $('#overlay').addClass("col-md-8");

      $('.show-button').hide();
  },

});
