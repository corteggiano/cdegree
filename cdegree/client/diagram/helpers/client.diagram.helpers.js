Template.diagram.helpers({

    //Returns all the sounds that match the filtering criteria and return limit
    courses:function(){

        var filter = {};
        var sort = {};

        //Filters the songs by the selected params
        if(Session.get("filterBy")){

            filter[Session.get("filterType")] = Session.get("filterBy");

        }

        //Sorts the songs by the selected params
        if(Session.get("sortBy")){

            sort[Session.get("sortType")] = Session.get("sortBy");

        } else {
            //if no sortBy selected sort by date added
            sort = {addedOn:-1};

        }

        return  Course.find({});

    },

    //Determines if a filter is active
    filtering_courses:function(){

        if (Session.get("filterBy")){

            return true;

        } else {

            return false;

        }

    },

    //Returns the filter type that is currently active
    getFilteredType:function(){
        if (Session.get("filterBy")){

            return Session.get("filterType");

        } else {

            return false;

        }
    }

});
