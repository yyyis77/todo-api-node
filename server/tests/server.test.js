const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 777
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                })
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                })
            });
    });
});

describe('GET /todos', ()=> {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        var HexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${HexID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-valid ID', (done) => {
        request(app)
            .get('/todo/123')
            .expect(404)
            .end(done)
    });
        
})

describe('DELETE /todo/:id', () => {
    it('should remove a todo', (done) => {
        var HexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${HexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(HexID);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
            
            Todo.findById(HexID).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((err) => {
                done(err);
            });
        })

    });
    
    it('should return 404 if todo not found', (done) => {
        var HexID = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${HexID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-valid ID', (done) => {
        request(app)
            .delete('/todo/123')
            .expect(404)
            .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var HexID = todos[0]._id.toHexString();
        var text = 'test from local'
        request(app)
            .patch(`/todos/${HexID}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var HexID = todos[1]._id.toHexString();
        var text = 'test from local to false'
        request(app)
            .patch(`/todos/${HexID}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist;
            })
            .end(done);
    });
})