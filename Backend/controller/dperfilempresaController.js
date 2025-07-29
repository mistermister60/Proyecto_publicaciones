
const controller = {};
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from dperfilempresa', (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    });
};

controller.edit = (req, res) => {
    const { Id_pemp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from dperfilempresa where Id_pemp = ?', [Id_pemp], (err, data) => {
            res.json(data[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into dperfilempresa set ?', [data], (err, result) => {
            res.json(result);
        });
    });
};

controller.update = (req, res) => {
    const { Id_pemp } = req.params;
    const updated = req.body;
    req.getConnection((err, conn) => {
        conn.query('update dperfilempresa set ? where Id_pemp = ?', [updated, Id_pemp], (err, result) => {
            res.json({ message: "Perfil de Empresa actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { Id_pemp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('update dperfilempresa set estado = ? where Id_pemp = ?', ['Inactivo',Id_pemp], (err, result) => {
            res.json({ message: "Perfil de Empresa eliminado" });
        });
    });
};
module.exports =controller;