var wanderzapp = angular.module('wanderzapp', [])
    .controller('wctrl', function ($scope, $timeout) {

        $scope.props = {
            errors: [],
            page_index: 1,
            last_index: [],
            email: "",
            points: 0,
            password: "",
            errormargin: "25vh",
            isACOpen: false,
            adderpoints: 0
        };

        $scope.cust = {
            social: {},
            booking: {},
            travel: {},
            eat: {},
            whobe: {},
            whatdo: {},
            event: {},
            misc: 0
        };

        $scope.ac = {
            isOpen: false,
            results: [],
            search: "",
            isLoading: false,
            arrowCounter: 0,
            items: ['Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal']
        };

        $scope.whobes = [
            { id: 1, desc: "Outdoorsy" },
            { id: 2, desc: "Party ANIMAL"},
            { id: 3, desc: "Anything goes"},
            { id: 4, desc: "Tourist"},
            { id: 5, desc: "Family Trip"},
            { id: 6, desc: "Beach Bum"}
        ];

        $scope.whatdos = [
            { id: 1, desc: "Tours/Attractions" },
            { id: 2, desc: "Lounge" },
            { id: 3, desc: "Shopaholc" },
            { id: 4, desc: "Journey" },
            { id: 5, desc: "Beach Excursion" },
            { id: 6, desc: "Thrills" },
            { id: 7, desc: "Sporty" },
            { id: 8, desc: "Foody" }
        ];

        $scope.socials = [
            { id: 1, disp: "Facebook" },
            { id: 2, disp: "Snapchat" },
            { id: 3, disp: "Twitter" }
        ];

        $scope.bookings = [
            { id: 1, disp: "Kayak" },
            { id: 2, disp: "Hotwire" },
            { id: 3, disp: "Travelocity" }
        ];

        $scope.travels = [
            { id: 1, disp: "Lyft" },
            { id: 2, disp: "Uber" },
            { id: 3, disp: "Google Maps" }
        ];

        $scope.eats = [
            { id: 1, disp: "Yelp" },
            { id: 2, disp: "GrubHub" },
            { id: 3, disp: "Restaurants" }
        ];

        $scope.loc = {
            events: [
                {
                    id: 1,
                    title: 'Machu Picchu',
                    desc: 'Machu Picchu was declared a Peruvian historic sancutary in 1981 and a unesco world heritage site in 1983',
                    desc2: 'Machu Picchu was voted on of the new seven wonders of the world in a worldwide internet poll',
                    done: false,
                    points: 15000,
                    showing: false
                },
                { id: 1, title: 'White Water Rafting', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 2, title: 'Eat Cuy', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 3, title: 'San Pedro', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 4, title: 'Change Currency', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 5, title: 'Learn Spanish on Babel', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 6, title: 'Stay in Hostel', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 7, title: 'Sakitay Pass', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 8, title: 'Wing It', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false},
                { id: 9, title: 'Recommendations', desc: 'Here are some descriptive words about this event', desc2: 'Here are some more descriptive words about this event', done: false, showing: false}]
        };

        $scope.ratio = 0.42;
        $scope.percent = 42;
        $scope.strokeWidth = 1;
        $scope.points = 0;
        $scope.labelSmall = "reputation";
        $scope.color = "#ffffff";
        $scope.opacity = 0.7;
        $scope.svgcode = "data-v-20ef9344";

        $scope.state = {
            showding: false,
            customtoggle: false,
            navopen: false
        };

        $scope.setPageIndex = function (index) {
            if (index !== $scope.props.page_index)
            {
                $scope.props.last_index.push($scope.props.page_index);
                $scope.props.page_index = index;
                $scope.ac.search = "";
            }
        };

        $scope.getLastIndex = function () {
            return $scope.props.last_index[$scope.props.last_index.length - 1];
        };

        $scope.goBackIndex = function () {
            if ($scope.props.last_index.length > 0) {
                $scope.props.page_index = $scope.props.last_index[$scope.props.last_index.length - 1];
                $scope.props.last_index.pop();
            }
        };

        $scope.checkForm = function (index) {
            $scope.props.errors = [];

            if (!$scope.props.email) {
                $scope.props.errors.push('Email required.');
            } else if (!$scope.validEmail($scope.props.email)) {
                $scope.props.errors.push('Valid email required.');
            }

            if (!$scope.props.password) {
                $scope.props.errors.push('Password required.');
            }

            if (!$scope.props.errors.length) {
                $scope.setPageIndex(index);
            }
            else {
                $scope.props.errormargin = "20vh";
            }
        };

        $scope.validEmail = function (email) {
            //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //return re.test(email);
            return true;
        };

        $scope.onChange = function () {
            $scope.filterResults();
            $scope.ac.isOpen = true;
        };

        $scope.filterResults = function () {
            // first uncapitalize all the things
            $scope.ac.results = $scope.ac.items.filter(item => {
                return item.toLowerCase().indexOf($scope.ac.search.toLowerCase()) > -1;
            });
        };
        $scope.setResult = function (result) {
            $scope.ac.search = result;
            $scope.ac.isOpen = false;
        };

        $scope.setEvent = function (event) {
            $scope.cust.event = event;
            $scope.state.showdesc = true;
        }; 

        $scope.checkEvent = function (event) {
            if (!event.done) {
                event.done = true;
                $scope.ding(5000);
            }
        };

        $scope.addPoints = function (points) {
            $scope.points += points;
            console.log($scope.points);
        };

        $scope.setWhoBe = function (id) {
            $scope.cust.whobe = $scope.whobes.filter(function (item) {
                return item.id === id;
            })[0];
        };

        $scope.setWhatDo = function (id) {
            $scope.cust.whatdo = $scope.whatdos.filter(function (item) {
                return item.id === id;
            })[0];
        };

        $scope.onKey = function (keycode) {
            if (keycode === 13) { onEnter(); }
            if (keycode === 38) { onArrowUp(); }
            if (keycode === 40) { onArrowDown(); }
        };

        onArrowDown = function (evt) {
            if ($scope.ac.arrowCounter < $scope.ac.results.length) {
                $scope.ac.arrowCounter = $scope.ac.arrowCounter + 1;
            }
        };

        onArrowUp = function () {
            if ($scope.ac.arrowCounter > 0) {
                $scope.ac.arrowCounter = $scope.ac.arrowCounter - 1;
            }
        };

        onEnter = function () {
            $scope.ac.search = $scope.ac.results[$scope.ac.arrowCounter];
            $scope.ac.isOpen = false;
            $scope.ac.arrowCounter = -1;
        };

        $scope.handleClickOutside = function (evt) {
            if (!$scope.$el.contains(evt.target)) {
                $scope.ac.isOpen = false;
                $scope.ac.arrowCounter = -1;
            }
        };

        $scope.setPieChart = function () {
            var fixedNumber = $scope.points * 158 / 100000;
            return fixedNumber + ' ' + 158;
        };

        $scope.clickLoc = function (event) {            
            console.log(event.offsetY);
            if (event.offsetY > 100) {
                $scope.ding(5000);
            }
        };

        $scope.ding = function (points) {        
            $scope.props.adderpoints = points;
            $scope.state.showding = true;

            $timeout(function () {
                $scope.addPoints(points);
                $scope.state.showding = false;
            }, 1500);
        }; 
    });