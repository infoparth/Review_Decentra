import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";

shared(msg) actor class Registry(){

  type rating = {
    rate: Nat;
    hasRated: Bool;
    review: Text;
  };

  type rated = {
    totalRatings: Nat;
    count: Nat;
  };

  //Mapping to store user's rating 
  let ratings = HashMap.HashMap<Principal, rating>(5, Principal.equal, Principal.hash);
  //Mapping to keep the total count of rating and the number of counts of a course
  let courses = HashMap.HashMap<Text, rated>(5, Text.equal, Text.hash);

  //Declaring the owner of the cannister
  stable var owner = msg.caller;

  //Functon to let users give rating to a particular course.
  public shared(msg) func rateCourse(_name: Text, _rating: Nat, _review: Text): async() {

    assert(courses.get(_name) != null);

    if(_rating >= 0  and _rating <= 5){

      let user: ?rating = ratings.get(msg.caller);

      let course: ?rated = courses.get(_name);

      switch(course){
        case(?course){

          switch(user){
            case(null){

          let newRating: rating = {
            rate = _rating;
            hasRated = true;
            review = _review;
          };

            ratings.put(msg.caller, newRating);

            let newCourseRating: rated ={
              totalRatings = course.totalRatings + _rating;
              count = course.count + 1
            };

            courses.put(_name, newCourseRating);
          
        };
        
        case(?userId){

          let newRating: rated = {

            totalRatings = course.totalRatings - userId.rate + _rating;
            count = course.count;
        };

        courses.put(_name, newRating);

        };

          };
        };
          case (null){

            assert(false);

          };

    };
    }

    else{
      assert(false);
    }
  };

    //Function to let the owner of the contract to add a new course to the mapping.
    //The owner can only add a new course, and cannot change the previous course.
    public shared(msg) func addCourse(_name: Text): async Text{

      assert(msg.caller == owner and courses.get(_name) == null);

      let course: rated = {
        totalRatings = 0;
        count = 0;
      };

      courses.put(_name, course);

      _name;

    };


    //function query a particular course raring
    public query func courseRating(_name: Text): async rated{

      let course: ?rated = courses.get(_name);

      switch(course){
        case(null){
          let crRating: rated = {
            totalRatings = 0;
            count = 0;
          };

         crRating;
        };
        case(?course){
        course;
        };
      };
    };

  }