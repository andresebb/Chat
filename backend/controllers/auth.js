const crearUsuario = async (req, res) => {
  res.json({
    ok: true,
    msg: "New User",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login success",
    email,
    password,
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "Token Validated",
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
