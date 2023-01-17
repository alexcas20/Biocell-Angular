
from flask import Flask, jsonify, request, Response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from pymongo import MongoClient
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from bson import json_util


# Making a Connection with MongoClient
client = MongoClient("mongodb://localhost:27017/")
# database
db = client["biocell"]
# collection
collUser = db["users"]
collPaciente = db["pacientes"]
collMedicos = db["medicos"]
collExamenes = db["examenes"]
collExamenesPacientes = db["examenesPacientes"]

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = "jacs1"  # change it


#
#               AUTH
#

@app.route('/lab/auth', methods=['POST'])
def login():

    user = request.json['user']
    password = request.json['password']

    test = collUser.find_one({"user": user, "password": password})

    if test:
        token = create_access_token(identity=user)
        return jsonify({
            "status": "ok",
            "result": {
                "token": token,
                "user": user
            }
        }), 201
    else:
        return jsonify(message="Bad Username or Password"), 401


# Register


@app.route("/lab/registerUser", methods=["POST"])
def register():

    print('creacion de usuario')
    code = request.json['code']
    user = request.json['user']
    password = request.json['password']
    rol = None if ('rol' not in request.json) else request.json['rol']
    status = request.json['status']

    hashed_password = generate_password_hash(password)
    test = collUser.find_one({"user": user})
    if test:
        return jsonify(message="User Already Exist"), 409
    else:

        collUser.insert_one({
            "code": code,
            'user': user,
            'password': hashed_password,
            'rol': rol,
            'status': status,
        })
        return jsonify(message="User added sucessfully"), 201


# listarUsers
@app.route("/lab/allUsers", methods=['GET'])
def allUsers():

    test = collUser.find({}, {'_id': 0})

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')


#   Edit usuario
@app.route('/lab/editUser/<code>', methods=['PUT'])
def editUser(code):
    code = request.json['code']
    user = request.json['user']
    password = request.json['password']
    rol = request.json['rol']
    status = request.json['status']

    hashed_password = generate_password_hash(password)

    test = collUser.update_one({"code": code}, {'$set': {
        "code": code,
        "user": user,
        "password": hashed_password,
        "rol": rol,
        "status": status
    }})

    if test:
        return jsonify(message="User with id: "+code + " update succesfully"), 201
    else:
        return jsonify(message='Error')


#   Delete usuario
@app.route('/lab/Delete/<code>', methods=['DELETE'])
def deleteUser(code):

    test = collUser.delete_one({"code": code})

    if test:
        return jsonify(message="User with code: "+code + " deleted succesfully"), 201
    else:
        return jsonify(message='Error')


##########  PACIENTES #########


#   Post Paciente
@app.route('/lab/addPaciente', methods=['POST'])
def addPaciente():

    folio = request.json["folio"]
    nombre = request.json["nombre"]
    apellidoP = request.json["apellidoP"]
    apellidoM = request.json["apellidoM"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    telefono = request.json["telefono"]
    correo = request.json["correo"]

    test = collPaciente.find_one({"telefono": telefono})
    if test:
        return jsonify(message="Patient alerady exist"), 409
    else:
        collPaciente.insert_one({
            "folio": folio,
            "nombre": nombre,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "edad": edad,
            "sexo": sexo,
            "telefono": telefono,
            "correo": correo
        })

        return jsonify(message="Patient added sucessfully"), 201


# Get Pacientes

@app.route("/lab/allPacientes", methods=["GET"])
def allPacientes():
    test = collPaciente.find({}, {
        "_id": 0
    })

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')

#   Delete usuario


@app.route('/lab/deletePaciente/<code>', methods=['DELETE'])
def deletePaciente(code):

    test = collPaciente.delete_one({"folio": code})

    if test:
        return jsonify(message="User with folio: "+code + " deleted succesfully"), 201
    else:
        return jsonify(message='Error')


##########  MEDICOS  #########


#   Post Medico
@app.route('/lab/addMedico', methods=['POST'])
def addMedico():

    folio = request.json["folio"]
    nombreMedico = request.json["nombreMedico"]
    apellidoP = request.json["apellidoP"]
    apellidoM = request.json["apellidoM"]
    especialidad = request.json["especialidad"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    telefono = request.json["telefono"]
    correo = request.json["correo"]

    test = collMedicos.find_one({"telefono": telefono})
    if test:
        return jsonify(message="Medico ya existe"), 409
    else:
        collMedicos.insert_one({
            "folio": folio,
            "nombreMedico": nombreMedico,
            "apellidoP": apellidoP,
            "apellidoM": apellidoM,
            "especialidad": especialidad,
            "edad": edad,
            "sexo": sexo,
            "telefono": telefono,
            "correo": correo
        })

        return jsonify(message="Se ha añadido al medico"), 201


@app.route("/lab/allMedicos", methods=["GET"])
def allMedicos():
    test = collMedicos.find({}, {
        "_id": 0
    })

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')


     #########   Examenes #########

@app.route("/lab/nuevoExamen", methods=["POST"])
def datosExamen():

    folio = request.json["folio"]
    nombre = request.json["nombre"]
    apellidoP = request.json["apellidoP"]
    apellidoM = request.json["apellidoM"]
    nombreMedico = request.json["nombreMedico"]
    especialidad = request.json["especialidad"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    telefono = request.json["telefono"]
    correo = request.json["correo"]
    fechaExamen = request.json["fechaExamen"]
    tipoExamen = request.json["tipoExamen"]
    prueba = request.json["prueba"]
    resultado = request.json["resultado"]
    dimensional = request.json["dimensional"]

    collExamenes.insert_one({
        "folio": folio,
        "nombre": nombre,
        "apellidoP": apellidoP,
        "apellidoM": apellidoM,
        "nombreMedico": nombreMedico,
        "especialidad": especialidad,
        "edad": edad,
        "sexo": sexo,
        "telefono": telefono,
        "correo": correo,
        "fechaExamen": fechaExamen,
        "tipoExamen": tipoExamen,
        "prueba": prueba,
        "resultado": resultado,
        "dimensional": dimensional
    })

    return jsonify(message="Se ha registrado el examen"), 201


@app.route("/lab/datosExamenes", methods=["GET"])
def datosExamenes():
    test = collExamenes.find({}, {
        "_id": 0
    })

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')



@app.route("/lab/addExamen/<folio>", methods=["PUT"])   
def addExamen(folio):


    nombre = request.json["nombre"]
    apellidoP = request.json["apellidoP"]
    apellidoM = request.json["apellidoM"]
    nombreMedico = request.json["nombreMedico"]
    especialidad = request.json["especialidad"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    telefono = request.json["telefono"]
    correo = request.json["correo"]
    fechaExamen = request.json["fechaExamen"]
    tipoExamen = request.json["tipoExamen"]
    prueba = request.json["prueba"]
    resultado = request.json["resultado"]
    dimensional = request.json["dimensional"]

    test = collExamenesPacientes.update_one(
        {"folio": folio},
        {"$addToSet": {"examenesPacientes": {
        "folio": folio,
        "nombre": nombre,
        "apellidoP": apellidoP,
        "apellidoM": apellidoM,
        "nombreMedico": nombreMedico,
        "especialidad": especialidad,
        "edad": edad,
        "sexo": sexo,
        "telefono": telefono,
        "correo": correo,
        "fechaExamen": fechaExamen,
        "tipoExamen": tipoExamen,
        "prueba": prueba,
        "resultado": resultado,
        "dimensional": dimensional
        }}}
        )

    print("respBD: ", test)

    return  jsonify(message="Se ha añadido el examen"), 201


    
@app.route("/lab/obtenerExamenes", methods= ["GET"])
def obtenerExamenes():
    test = collExamenesPacientes.find({},{
        "examenesPacientes": 1,
        "_id": 0
    })

    response = json_util.dumps(test)
    return Response(response, mimetype='application/json')



if __name__ == '__main__':
    app.run(debug=True, port=5000)