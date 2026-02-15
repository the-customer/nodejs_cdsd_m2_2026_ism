import { users } from "../data.js";


const userCtrl = {
    list: (req, res) => {
        const allUsers = [...users];
        return res.status(200).json({
            data: allUsers,
            count: allUsers.length
        })
    },
    add: (req, res) => {
        //...
    }
}

export default userCtrl;
