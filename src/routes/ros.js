const config = require('../../lib/config').config
var express = require('express');
var router = express.Router();
let app = express();
const ROSLIB = require('roslib');
const moveBaseController = require('../controller/moveBase/MoveBaseController');

router.get('/publishTest', (req, res, next) => {
    console.log(config.ros);
    if(config && config.ros && config.ros.isConnected){
        const topic = new ROSLIB.Topic({
            ros : config.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        const twist = new ROSLIB.Message({
            linear : {
                x : 0.1,
                y : 0.2,
                z : 0.3
            },
            angular : {
                x : -0.1,
                y : -0.2,
                z : -0.3
            }
        });
        topic.publish(twist);
        res.send('try to send a message to rosbridge')
    }else{
        res.send('ros not enable')
    }
});
app.route('/api/serTargetBase').post(moveBaseController.setTargetPose);

module.exports = router;
