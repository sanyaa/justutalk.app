/**
 * Created by temp on 14/02/2015.
 */
angular.module('kendoMail', ['kendo.directives'])
    .controller("main", function($scope) {
        $scope.inboxItem = $("#inboxItem").html();
        $scope.inbox = [
            {
                ID: 1,
                From: "John Doe",
                Subject: "Monday meeting",
                Text: "Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.",
                Time: "07:56"
            },
            {
                ID: 2,
                From: "Sarah Connor",
                Subject: "Regarding org chart changes",
                Text: "Tom, I checked the new org chart last night and I have some reservations about it...",
                Time: "08:22"
            },
            {
                ID: 3,
                From: "Jane Parker",
                Subject: "Your Costume is ready",
                Text: "Hi mr. Sawyer, I'm sorry for the delay, your Halloween costume is ready. The bears...",
                Time: "10:14"
            },
            {
                ID: 4,
                From: "Joe Harper",
                Subject: "I'm sorry, Tom",
                Text: "Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...",
                Time: "10:14"
            },
            {
                ID: 5,
                From: "Becky Thatcher",
                Subject: "Out tonight?",
                Text: "Honey, wanna go out tonight to grab some chicken? My weekly vouchers for cooking...",
                Time: "10:14"
            }
        ];

        $scope.onOpen = function(e) {
            e.sender.element.find(".km-actionsheet-title").text(e.target.next().text());
        }

        $scope.reply = function(e) {
            $("#actionResult").html("Replying to message #" + e.context);
        }

        $scope.replyAll = function(e) {
            $("#actionResult").html("Replying to all in message #" + e.context);
        }

        $scope.archive = function(e) {
            $("#actionResult").html("Archiving message #" + e.context);
        }
    });