const Router = require('koa-router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-todo-ninja', {useNewUrlParser: true, useUnifiedTopology: true});

const Todo = mongoose.model('Todo', {
	checked: {type: Boolean, default: false},
	title: {type: String, default: ''}
});

// const kitty = new Todo({name: 'Zildjian'});
// kitty.save().then(() => console.log('meow'));


let router = new Router();

router.get('/test', async function (ctx) {
	ctx.body = 'Test!';
});

router.put('/createOne', async function (ctx) {
	let item = new Todo();
	ctx.body = await item.save();
});

router.post('/saveOne', async function (ctx) {
	let {id, new_attrs} = ctx.request.body;
	let item = await Todo.findOne({_id: id}); // mongoose.ObjectId(id)
	Object.assign(item, new_attrs);
	ctx.body = await item.save();
});

router.get('/getAll', async function (ctx) {
	ctx.body = await Todo.find();
});


module.exports = router;
