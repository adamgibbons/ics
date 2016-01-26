var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var moment = require('moment')
var ical = require('../index.js')
var app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res) {
    //TEMP until we build a index.html
    res.redirect(301, '/create')
        /*res.sendFile('public/index.html', {
            root: __dirname
        });*/
});

app.get('/create', function(req, res) {

    //ATTENDEE;CN="Humphrey, Jason.";RSVP=FALSE:mailto:jason@greenpioneersolutions.com
    //
    var options = {
        eventName: 'Welcome Event to ICS',
        description: 'Meet Down at the index.js',
        fileName: 'example.ics',
        dtstart: moment().set({
            'minute': 0,
            'hour': 9
        }),
        dtend: moment().set({
            'minute': 0,
            'hour': 10
        }),
        location: 'Fort Worth, Texas',
        organizer: {
            name: 'greenpioneersolutions',
            email: 'info@greenpioneersolutions.com'
        },
        attendees: [{
            name: 'Support greenpioneersolutions',
            email: 'Support@greenpioneersolutions.com',
            rsvp: false
        }, {
            name: 'Accounting greenpioneersolutions',
            email: 'Accounting@greenpioneersolutions.com',
            rsvp: true
        }, {
            name: 'Sales greenpioneersolutions',
            email: 'Sales@greenpioneersolutions.com',
            rsvp: true
        }, {
            name: 'no RSVP greenpioneersolutions',
            email: 'Sales@greenpioneersolutions.com'
        }]

    }
    ical.createEvent(options, null, function(err, success) {
        if (err) return res.status(400).send(err)
        fs.readFile(success, function(err, data) {
            if (err) return res.status(400).send(err)
            fs.writeFile(path.resolve(__dirname, 'public/created/example.ics'), data, function(err) {
                fs.unlinkSync(success)
                if (err) return res.status(400).send(err)
                return res.status(200).send({
                    url: req.get('host') + ':' + app.get('port') + '/created/example.ics'
                })
            })
        })
    })
})

app.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
})