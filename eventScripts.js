$(function() {
	var dataStore = new Firebase('https://hackmitproject.firebaseio.com/'); // instantiate Firebase object

	// if making a new event (button click)
	$('.eventDetails').keypress(function(key) { // one 'Enter' and in #description input
		if (key.keyCode === 13) {

			// get the text in the title and description fields
			var title = $('#eventTitle').val();
			var description = $('#description').val();
			var author = $('#author').val();

			if (title === "" || description === "" || author === "") { // if either field is empty
				alert("Can not have empty field. Please make sure the form is completely filled out");
				return false;
			}

			// combined push() and set(). Will update JSON all at once with timestamp
			var newPush = dataStore.push();

			newPush.set({title: title, description: description, attendees: {}, interested: {}}, function(err) { // GENERAL INFO
				if (err) alert('Data could not be written' + err); // callback if error
				else alert('Event saved successfully');
			});
		}
	});



	dataStore.on('child_added', function(dataSnapshot) { // Added an event
		var attendingList = 'People attending: ';
		var data = dataSnapshot.val();
		var template = $('#eventTemplate').html();

		if ('attending' in data) {
			for (key in data.attending) {
				attendingList += data.attending[key] + ', ';
			}
			attendingList = attendingList.slice(0, attendingList.length - 2);
		}

		template = template.replace(/\{0\}/g, data.title);
		template = template.replace(/\{1\}/g, data.description);
		template = template.replace(/\{2\}/g, escape(dataSnapshot.name()));
		template = template.replace(/\{3\}/g, attendingList);

		$('#eventdiv').append(template);


		$('.actionButton').unbind('click');
		$('.actionButton').click(function() {
			var identifier = unescape($(this).parents('.eventwrapper').find('.identifier').val());
			var usernameToAdd = $('#attendee_interested').val();

			if (usernameToAdd == '') {
				return;
			}

			var classes = $(this).prop('class').split(' ');
			destination = classes[classes.length - 1];

			childStore = dataStore.child(identifier);
			childStore.child(destination).push(usernameToAdd, function(err) { 
				// if (err) alert('Data could not be written' + err); // callback if error
				// else alert('Event saved successfully');
			});
		});
	});

	dataStore.on('child_changed', function(dataSnapshot) {
		var identifier = dataSnapshot.name();

		// alert($("."+identifier).prop('tagName'));
		$.each($('.identifier'), function() {
			if ((identifier) == $(this).val()) {
				var data = dataSnapshot.val();
				var attendingList = 'People attending: ';

				if ('attending' in data) {
					for (key in data.attending) {
						attendingList += data.attending[key] + ', ';
					}
					attendingList = attendingList.slice(0, attendingList.length - 2);
				}

				$(this).parent().find('.eventtitle').html(data.title);
				$(this).parent().find('.eventdescription').html(data.description);
				$(this).parent().find('.eventcomments').html(attendingList);
			}
		});
	});
});