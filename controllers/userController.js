const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.registerUser(username, email, password);
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: user.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registrando usuario", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await userModel.getUserByEmail(email);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    res
      .status(200)
      .json({
        message: "Login exitoso",
        user: { username: user.username, email: user.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el inicio de sesión", error: error.message });
  }
};
