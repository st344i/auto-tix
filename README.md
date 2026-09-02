# auto-tix

Welcome to Auto Tix

To get his machine running clone the following:

Pre-authorised ticket purchasing platform. Buyers reserve tickets ahead of an event's on-sale time

Any pre-auths a reviewer submits while testing will vanish if they restart the backend

*** Backend ***

Repository → Service → Controller → Spring turns it into JSON → sent to the frontend 

GET /api/events arrives → Spring runs EventController.getEvents()

getEvents() calls → eventService.getAllEvents()

getAllEvents() calls → eventRepository.findAll() ← this exists automatically, right now, from ListCrudRepository

findAll() runs → SELECT \* FROM events against MySQL, maps each row to an Event object, returns a List<Event>


Controller:

Verb	           Intent	           Does it change data?
GET	           "Give me data"	       No — read-only
POST	    "Create something new"	   Yes
PUT	      "Update something existing"  Yes
DELETE	  "Remove/cancel something"	   Yes
