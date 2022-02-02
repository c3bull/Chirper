import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';
import * as MongoClient from "mongodb";
import * as res from "express";
import postDAO from "../DAO/postDAO";

function create(context) {

    function hashString(password) {
        return sha1(password);
    }

    function fetchAll() {
        MongoClient.connect('mongodb+srv://admin:12345@cluster0.r6n5m.mongodb.net/usersdb', {useUnifiedTopology: true}, function (err, db) {
            if (err) throw err;

            let coll = db.collection('post');

            coll.find({}).toArray(function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(result));
                }
            })

        });
    }

    async function authenticate(email, password) {
        let userData;
        const user = await UserDAO.getByEmailOrName(email);
        if (!user) {
            throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
        }
        userData = await user;
        await PasswordDAO.authorize(user.id, hashString(password));
        const token = await TokenDAO.create(userData);

        return {
            token: getToken(token),
            user: user
        };
    }

    function getToken(token) {
        return {token: token.value};
    }

    async function createNewOrUpdate(userData) {
        const user = await UserDAO.createNewOrUpdate(userData);
        if (await userData.password) {
            return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
        } else {
            return user;
        }
    }

    async function removeHashSession(userId) {
        return await TokenDAO.remove(userId);
    }

    async function removePost(id) {
        return await postDAO.remove({ _id: { $eq: id } });
    }

    async function editBio(data) {
        return await UserDAO.edit(data);
    }


    return {
        authenticate: authenticate,
        createNewOrUpdate: createNewOrUpdate,
        removeHashSession: removeHashSession,
        removePost: removePost,
        fetchAll: fetchAll,
        editBio: editBio
    };
}

export default {
    create: create
};
