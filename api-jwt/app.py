
import os
from flask import Flask, jsonify, request, Response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from pymongo import MongoClient
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util


 #Making a Connection with MongoClient
#client = MongoClient(
 #"mongodb+srv://HJuve:-Diminombre8906@cluster0.7gpeolt.mongodb.net/?retryWrites=true&w=majority")
 #database

client = MongoClient("mongodb://localhost:27017/")
db = client["biocell"]
# collection
collUser = db["users"]
collPaciente = db["pacientes"]
collMedicos = db["medicos"]
collExamenes = db["examenes"]
collExamenesPacientes = db["examenesPacientes"]
collTiposExamenes = db["tiposExamenes"]

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = "jacs1"  # change it




#
#               AUTH
#

@ app.route('/lab/auth', methods=['POST'])
def login():

    user = request.json['user']
    password = request.json['password']

    
  
    
    test = collUser.find_one({"user": user, "password": password })

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
        return jsonify({
            "status": "false",
            "result": {
                "msg": 'Datos incorrectos.'}
        }), 401


# Register


@ app.route("/lab/registerUser", methods=["POST"])
def register():

    print('creacion de usuario')
    user = request.json['user']
    password = request.json['password']

   

    hashed_Pass= generate_password_hash(password)
    test = collUser.find_one({"user": user})
    if test:
        return jsonify(message="El usuario ya existe."), 409
    else:

        collUser.insert_one({
            'user': user,
            'password': hashed_Pass ,
            'rol': 'USER',
            'status': "activo",
        })
        return jsonify(message="User added sucessfully"), 201

# Register sin hash


@ app.route("/lab/registerUserL", methods=["POST"])
def registerL():

    print('creacion de usuario desde registro')
    code = request.json['code']
    user = request.json['user']
    password = request.json['password']
    rol = request.json['rol']

   

    
    test = collUser.find_one({"user": user})
    test2 = collUser.find_one({"code": code})
    if test or test2:
        return jsonify(message="El usuario ya existe."), 409
    else:

        collUser.insert_one({
            'code': code,
            'user': user,
            'password': password ,
            'rol': rol
        })
        return jsonify(message="User added sucessfully"), 201


# listarUsers
@ app.route("/lab/allUsers", methods=['GET'])
def allUsers():

    test = collUser.find({}, {'_id': 0})

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')


#   Edit usuario
@ app.route('/lab/editUser/<code>', methods=['PUT'])
def editUser(code):
    
    password = request.json['password']
    rol = request.json['rol']
    imageUser = request.json['imageUser']
  
   

   

    test = collUser.update_one({"code": code}, {'$set': {
        
        
        "password": password,
        "rol" : rol,
        "imageUser": imageUser
        
    }})

    if test:
        return jsonify(message="User update succesfully"), 201
    else:
        return jsonify(message='Error')



#uploadImage

# @ app.route('/lab/uploadImage/<user>', methods=['PUT'])
# def uploadImage(user):

#     if 'profile_image' in request.files:
#         profile_image = request.files['profile_image']
#         basepath = os.path.dirname (__file__) 
#         filename = profile_image.filename
#         upload_path = os.path.join (basepath, 'images', filename)
#         profile_image.save(upload_path)
      

#         test = collUser.update_one({"user": user}, {'$set': {
        
        
#         "profileImg": filename,
    
        
#     }})

    
#     return jsonify(message="Image upload"), 201
 



#   Delete usuario
@ app.route('/lab/deleteUser/<code>', methods=['DELETE'])
def deleteUser(code):

    test = collUser.delete_one({"code": code})

    if test:
        return jsonify(message="User deleted deleted succesfully"), 201
    else:
        return jsonify(message='Error')


##########  PACIENTES ###########################################################


#   Post Paciente
@ app.route('/lab/addPaciente', methods=['POST'])
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

@ app.route("/lab/allPacientes", methods=["GET"])
def allPacientes():
    test = collPaciente.find({}, {
        "_id": 0
    })

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')

#   Actualizar Paciente


@ app.route('/lab/updatePaciente/<folio>', methods=['PUT'])
def updatePaciente(folio):
    folio = request.json['folio']
    nombre = request.json['nombre']
    apellidoP = request.json['apellidoP']
    apellidoM = request.json['apellidoM']
    edad = request.json['edad']
    sexo = request.json['sexo']
    telefono = request.json['telefono']
    correo = request.json['correo']

    test = collPaciente.update_one({"folio": folio}, {'$set': {
        "folio": folio,
        "nombre": nombre,
        "apellidoP": apellidoP,
        "apellidoM": apellidoM,
        "edad": edad,
        "sexo": sexo,
        "telefono": telefono,
        "correo": correo
    }})

    if test:
        return jsonify(message="Paciente with id: "+folio + " update succesfully"), 201
    else:
        return jsonify(message='Error')


#BORRAR PACIENTE
@ app.route('/lab/deletePaciente/<code>', methods=['DELETE'])
def deletePaciente(code):

    test = collPaciente.delete_one({"folio": code})

    if test:
        return jsonify(message="User with folio: "+code + " deleted succesfully"), 201
    else:
        return jsonify(message='Error')

#BORRAR PACIENTES
@app.route('/lab/deletePacientes', methods=['DELETE'])
def deletePacientes():
    test = collPaciente.delete_many({})

    return jsonify(message='Todos los pacientes han sido borrados'),201


##########  MEDICOS  #############################################################


#   Post Medico
@ app.route('/lab/addMedico', methods=['POST'])
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

# Get Medicos


@ app.route("/lab/allMedicos", methods=["GET"])
def allMedicos():
    test = collMedicos.find({}, {
        "_id": 0
    })

    if test:
        response = json_util.dumps(test)
        return Response(response, mimetype='application/json')
    else:
        return jsonify(message='Error')

# Update Medicos


@ app.route('/lab/updateMedico/<folio>', methods=['PUT'])
def updateMedico(folio):
    folio = request.json['folio']
    nombreMedico = request.json['nombreMedico']
    apellidoP = request.json['apellidoP']
    apellidoM = request.json['apellidoM']
    especialidad = request.json['especialidad']
    edad = request.json['edad']
    sexo = request.json['sexo']
    telefono = request.json['telefono']
    correo = request.json['correo']

    test = collMedicos.update_one({"folio": folio}, {'$set': {
        "folio": folio,
        "nombreMedico": nombreMedico,
        "apellidoP": apellidoP,
        "apellidoM": apellidoM,
        "especiaidad": especialidad,
        "edad": edad,
        "sexo": sexo,
        "telefono": telefono,
        "correo": correo
    }})

    if test:
        return jsonify(message="Medico with id: "+folio + " update succesfully"), 201
    else:
        return jsonify(message='Error')


# DeleteMedico
@ app.route('/lab/deleteMedico/<folio>', methods=['DELETE'])
def deleteMedico(folio):

    test = collMedicos.delete_one({"folio": folio})

    if test:
        return jsonify(message="User with folio: "+folio + " deleted succesfully"), 201
    else:
        return jsonify(message='Error')


@app.route("/lab/datosMedico/<nombreMedico>", methods=["GET"])
def datosMedico(nombreMedico):
    test = collMedicos.find_one({"nombreMedico": nombreMedico}, {
        "nombreMedico": 1,
        "apellidoP": 1,
        "apellidoM": 1,
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

    folioExamen = request.json["folioExamen"]
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
    estudio = request.json["estudio"]

    collExamenes.insert_one({
        "folioExamen": folioExamen,
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
        "estudio": estudio,
        "estado": "activo"
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


@app.route("/lab/addExamen/<folio>", methods = ["PUT"])
def addExamen(folio):

    folioExamen = request.json["folioExamen"]
    nombre=request.json["nombre"]
    apellidoP=request.json["apellidoP"]
    apellidoM=request.json["apellidoM"]
    nombreMedico=request.json["nombreMedico"]
    especialidad=request.json["especialidad"]
    edad=request.json["edad"]
    sexo=request.json["sexo"]
    telefono=request.json["telefono"]
    correo=request.json["correo"]
    tipoExamen=request.json["tipoExamen"]
    fechaExamen=request.json["fechaExamen"]
    estudio=request.json["estudio"]
    parametros=request.json["parametros"]
    metodo=request.json["metodo"]
   
    
  
   

    test = collExamenesPacientes.update_one(
        {"folio": folio},
        {"$addToSet": {"examenesPacientes": {
            "folioExamen": folioExamen,
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
            "estudio": estudio,
            "parametros": parametros,
            "metodo": metodo
            
            
        }}}
    )

    print("respBD: ", test)

    return jsonify(message="Se ha añadido el examen"), 201


@ app.route('/lab/addPacienteExamen', methods=['POST'])
def addPacienteExamen():

   
    folio = request.json["folio"]
    nombre = request.json["nombre"]
    apellidoP = request.json["apellidoP"]
    apellidoM = request.json["apellidoM"]
    edad = request.json["edad"]
    sexo = request.json["sexo"]
    telefono = request.json["telefono"]
    correo = request.json["correo"]

    collExamenesPacientes.insert_one({

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


@ app.route("/lab/Examenes", methods=["GET"])
def obtenerExamenes():
    test = collExamenesPacientes.find({}, {
        "examenesPacientes": 1,
        "_id": 0
    })

    response = json_util.dumps(test)
    return Response(response, mimetype='application/json'), 201


@ app.route("/lab/obtenerExamenes/<folio>", methods=["GET"])
def obtenerExamenesFolio(folio):
    test = collExamenesPacientes.find({'folio': folio}, {
        "examenesPacientes": 1,
        "_id": 0
    })

    response = json_util.dumps(test)
    return Response(response, mimetype="application/json"), 201


###################################################### Examenes#######################################

@ app.route("/lab/tiposExamenes", methods=["GET"])
def tiposExamenes():
    test = collTiposExamenes.find({}, {
        "_id": 0
    })

    response = json_util.dumps(test)
    return Response(response, mimetype='application/json'), 201


@app.route("/lab/finalizarExamen/<folioExamen>", methods=["PUT"])
def finalizarExamenes(folioExamen):

    test = collExamenes.update_one(
        {"folioExamen": folioExamen},
        {"$set": {"estado": "finalizado"}}
        
    
    )

    print("respBD: ", test)
    return jsonify(message="Se ha actualizado el status"), 201


@app.route("/lab/estudiosExamen/<examen>", methods=["GET"])
def estudiosExamen(examen):
    test = collTiposExamenes.find_one(
        {"examen": examen}, {
            "estudios" : 1,
            "_id":0
        }
    )

    response = json_util.dumps(test)
    return Response(response, mimetype="application/json"), 201

##Get parametros Examen
@app.route("/lab/parametrosEstudio/<examen>/<estudio>", methods=["GET"])
def parametrosEstudio(estudio,examen):
    test = collTiposExamenes.find_one({"examen": examen},
    {
        "estudios": {"$elemMatch": {"nombre": estudio}},
    
        "_id": 0,
        "examen": 0
    }
        
    )

    response = json_util.dumps(test)
    return Response(response, mimetype="application/json"), 201

###BORRAR EXAMEN
@app.route('/lab/borrarExamen/<folio>', methods=['DELETE'])
def borrarExamen(folio):
    test = collExamenes.delete_one({"folioExamen": folio})

    return jsonify(message="Examen borrado correctamente"), 201


###BORRAR TODOS LOS EXAMENES
@app.route('/lab/borrarExamenes', methods=['DELETE'])
def borrarExamenes():
    test = collExamenes.delete_many({})

    return jsonify(message="Examenes borrados correctamente"), 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)
