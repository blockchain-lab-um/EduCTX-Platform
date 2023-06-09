/* eslint-disable */
// source: json-shema.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.CA', null, global);
goog.exportSymbol('proto.Cert', null, global);
goog.exportSymbol('proto.Certificate', null, global);
goog.exportSymbol('proto.Person', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Certificate = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Certificate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.Certificate.displayName = 'proto.Certificate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Person = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Person, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.Person.displayName = 'proto.Person';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CA = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CA, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.CA.displayName = 'proto.CA';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Cert = function (opt_data) {
	jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Cert, jspb.Message);
if (goog.DEBUG && !COMPILED) {
	/**
	 * @public
	 * @override
	 */
	proto.Cert.displayName = 'proto.Cert';
}

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.Certificate.prototype.toObject = function (opt_includeInstance) {
		return proto.Certificate.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.Certificate} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.Certificate.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				eductxversion: jspb.Message.getFieldWithDefault(msg, 1, ''),
				timestamp: jspb.Message.getFieldWithDefault(msg, 2, ''),
				person:
					(f = msg.getPerson()) &&
					proto.Person.toObject(includeInstance, f),
				ca: (f = msg.getCa()) && proto.CA.toObject(includeInstance, f),
				certificate:
					(f = msg.getCertificate()) &&
					proto.Cert.toObject(includeInstance, f),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Certificate}
 */
proto.Certificate.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.Certificate();
	return proto.Certificate.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Certificate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Certificate}
 */
proto.Certificate.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setEductxversion(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setTimestamp(value);
				break;
			case 3:
				var value = new proto.Person();
				reader.readMessage(
					value,
					proto.Person.deserializeBinaryFromReader
				);
				msg.setPerson(value);
				break;
			case 4:
				var value = new proto.CA();
				reader.readMessage(value, proto.CA.deserializeBinaryFromReader);
				msg.setCa(value);
				break;
			case 5:
				var value = new proto.Cert();
				reader.readMessage(
					value,
					proto.Cert.deserializeBinaryFromReader
				);
				msg.setCertificate(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Certificate.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.Certificate.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Certificate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Certificate.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getEductxversion();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getTimestamp();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getPerson();
	if (f != null) {
		writer.writeMessage(3, f, proto.Person.serializeBinaryToWriter);
	}
	f = message.getCa();
	if (f != null) {
		writer.writeMessage(4, f, proto.CA.serializeBinaryToWriter);
	}
	f = message.getCertificate();
	if (f != null) {
		writer.writeMessage(5, f, proto.Cert.serializeBinaryToWriter);
	}
};

/**
 * optional string eductxVersion = 1;
 * @return {string}
 */
proto.Certificate.prototype.getEductxversion = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.setEductxversion = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string timestamp = 2;
 * @return {string}
 */
proto.Certificate.prototype.getTimestamp = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.setTimestamp = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional Person person = 3;
 * @return {?proto.Person}
 */
proto.Certificate.prototype.getPerson = function () {
	return /** @type{?proto.Person} */ (
		jspb.Message.getWrapperField(this, proto.Person, 3)
	);
};

/**
 * @param {?proto.Person|undefined} value
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.setPerson = function (value) {
	return jspb.Message.setWrapperField(this, 3, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.clearPerson = function () {
	return this.setPerson(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Certificate.prototype.hasPerson = function () {
	return jspb.Message.getField(this, 3) != null;
};

/**
 * optional CA ca = 4;
 * @return {?proto.CA}
 */
proto.Certificate.prototype.getCa = function () {
	return /** @type{?proto.CA} */ (
		jspb.Message.getWrapperField(this, proto.CA, 4)
	);
};

/**
 * @param {?proto.CA|undefined} value
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.setCa = function (value) {
	return jspb.Message.setWrapperField(this, 4, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.clearCa = function () {
	return this.setCa(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Certificate.prototype.hasCa = function () {
	return jspb.Message.getField(this, 4) != null;
};

/**
 * optional Cert certificate = 5;
 * @return {?proto.Cert}
 */
proto.Certificate.prototype.getCertificate = function () {
	return /** @type{?proto.Cert} */ (
		jspb.Message.getWrapperField(this, proto.Cert, 5)
	);
};

/**
 * @param {?proto.Cert|undefined} value
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.setCertificate = function (value) {
	return jspb.Message.setWrapperField(this, 5, value);
};

/**
 * Clears the message field making it undefined.
 * @return {!proto.Certificate} returns this
 */
proto.Certificate.prototype.clearCertificate = function () {
	return this.setCertificate(undefined);
};

/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Certificate.prototype.hasCertificate = function () {
	return jspb.Message.getField(this, 5) != null;
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.Person.prototype.toObject = function (opt_includeInstance) {
		return proto.Person.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.Person} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.Person.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				id: jspb.Message.getFieldWithDefault(msg, 1, ''),
				firstname: jspb.Message.getFieldWithDefault(msg, 2, ''),
				lastname: jspb.Message.getFieldWithDefault(msg, 3, ''),
				ethaddress: jspb.Message.getFieldWithDefault(msg, 4, ''),
				eductxid: jspb.Message.getFieldWithDefault(msg, 5, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Person}
 */
proto.Person.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.Person();
	return proto.Person.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Person} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Person}
 */
proto.Person.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setId(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setFirstname(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setLastname(value);
				break;
			case 4:
				var value = /** @type {string} */ (reader.readString());
				msg.setEthaddress(value);
				break;
			case 5:
				var value = /** @type {string} */ (reader.readString());
				msg.setEductxid(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Person.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.Person.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Person} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Person.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getId();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getFirstname();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getLastname();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
	f = message.getEthaddress();
	if (f.length > 0) {
		writer.writeString(4, f);
	}
	f = message.getEductxid();
	if (f.length > 0) {
		writer.writeString(5, f);
	}
};

/**
 * optional string id = 1;
 * @return {string}
 */
proto.Person.prototype.getId = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Person} returns this
 */
proto.Person.prototype.setId = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string firstName = 2;
 * @return {string}
 */
proto.Person.prototype.getFirstname = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Person} returns this
 */
proto.Person.prototype.setFirstname = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string lastName = 3;
 * @return {string}
 */
proto.Person.prototype.getLastname = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Person} returns this
 */
proto.Person.prototype.setLastname = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string ethAddress = 4;
 * @return {string}
 */
proto.Person.prototype.getEthaddress = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 4, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Person} returns this
 */
proto.Person.prototype.setEthaddress = function (value) {
	return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * optional string eduCTXid = 5;
 * @return {string}
 */
proto.Person.prototype.getEductxid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 5, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Person} returns this
 */
proto.Person.prototype.setEductxid = function (value) {
	return jspb.Message.setProto3StringField(this, 5, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.CA.prototype.toObject = function (opt_includeInstance) {
		return proto.CA.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.CA} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.CA.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				fullname: jspb.Message.getFieldWithDefault(msg, 1, ''),
				logouri: jspb.Message.getFieldWithDefault(msg, 2, ''),
				ethaddress: jspb.Message.getFieldWithDefault(msg, 3, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CA}
 */
proto.CA.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.CA();
	return proto.CA.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CA} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CA}
 */
proto.CA.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setFullname(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setLogouri(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setEthaddress(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CA.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.CA.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CA} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CA.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getFullname();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getLogouri();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getEthaddress();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
};

/**
 * optional string fullname = 1;
 * @return {string}
 */
proto.CA.prototype.getFullname = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.CA} returns this
 */
proto.CA.prototype.setFullname = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string logoURI = 2;
 * @return {string}
 */
proto.CA.prototype.getLogouri = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.CA} returns this
 */
proto.CA.prototype.setLogouri = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string ethAddress = 3;
 * @return {string}
 */
proto.CA.prototype.getEthaddress = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.CA} returns this
 */
proto.CA.prototype.setEthaddress = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
	/**
	 * Creates an object representation of this proto.
	 * Field names that are reserved in JavaScript and will be renamed to pb_name.
	 * Optional fields that are not set will be set to undefined.
	 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
	 * For the list of reserved names please see:
	 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
	 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
	 *     JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @return {!Object}
	 */
	proto.Cert.prototype.toObject = function (opt_includeInstance) {
		return proto.Cert.toObject(opt_includeInstance, this);
	};

	/**
	 * Static version of the {@see toObject} method.
	 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
	 *     the JSPB instance for transitional soy proto support:
	 *     http://goto/soy-param-migration
	 * @param {!proto.Cert} msg The msg instance to transform.
	 * @return {!Object}
	 * @suppress {unusedLocalVariables} f is only used for nested messages
	 */
	proto.Cert.toObject = function (includeInstance, msg) {
		var f,
			obj = {
				type: jspb.Message.getFieldWithDefault(msg, 1, ''),
				certificatetitle: jspb.Message.getFieldWithDefault(msg, 2, ''),
				unitid: jspb.Message.getFieldWithDefault(msg, 3, ''),
				unittitle: jspb.Message.getFieldWithDefault(msg, 4, ''),
				shortdescription: jspb.Message.getFieldWithDefault(msg, 5, ''),
				fulldescriptionuri: jspb.Message.getFieldWithDefault(
					msg,
					6,
					''
				),
				value: jspb.Message.getFieldWithDefault(msg, 7, ''),
				unitmeasurement: jspb.Message.getFieldWithDefault(msg, 8, ''),
			};

		if (includeInstance) {
			obj.$jspbMessageInstance = msg;
		}
		return obj;
	};
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Cert}
 */
proto.Cert.deserializeBinary = function (bytes) {
	var reader = new jspb.BinaryReader(bytes);
	var msg = new proto.Cert();
	return proto.Cert.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Cert} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Cert}
 */
proto.Cert.deserializeBinaryFromReader = function (msg, reader) {
	while (reader.nextField()) {
		if (reader.isEndGroup()) {
			break;
		}
		var field = reader.getFieldNumber();
		switch (field) {
			case 1:
				var value = /** @type {string} */ (reader.readString());
				msg.setType(value);
				break;
			case 2:
				var value = /** @type {string} */ (reader.readString());
				msg.setCertificatetitle(value);
				break;
			case 3:
				var value = /** @type {string} */ (reader.readString());
				msg.setUnitid(value);
				break;
			case 4:
				var value = /** @type {string} */ (reader.readString());
				msg.setUnittitle(value);
				break;
			case 5:
				var value = /** @type {string} */ (reader.readString());
				msg.setShortdescription(value);
				break;
			case 6:
				var value = /** @type {string} */ (reader.readString());
				msg.setFulldescriptionuri(value);
				break;
			case 7:
				var value = /** @type {string} */ (reader.readString());
				msg.setValue(value);
				break;
			case 8:
				var value = /** @type {string} */ (reader.readString());
				msg.setUnitmeasurement(value);
				break;
			default:
				reader.skipField();
				break;
		}
	}
	return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Cert.prototype.serializeBinary = function () {
	var writer = new jspb.BinaryWriter();
	proto.Cert.serializeBinaryToWriter(this, writer);
	return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Cert} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Cert.serializeBinaryToWriter = function (message, writer) {
	var f = undefined;
	f = message.getType();
	if (f.length > 0) {
		writer.writeString(1, f);
	}
	f = message.getCertificatetitle();
	if (f.length > 0) {
		writer.writeString(2, f);
	}
	f = message.getUnitid();
	if (f.length > 0) {
		writer.writeString(3, f);
	}
	f = message.getUnittitle();
	if (f.length > 0) {
		writer.writeString(4, f);
	}
	f = message.getShortdescription();
	if (f.length > 0) {
		writer.writeString(5, f);
	}
	f = message.getFulldescriptionuri();
	if (f.length > 0) {
		writer.writeString(6, f);
	}
	f = message.getValue();
	if (f.length > 0) {
		writer.writeString(7, f);
	}
	f = message.getUnitmeasurement();
	if (f.length > 0) {
		writer.writeString(8, f);
	}
};

/**
 * optional string type = 1;
 * @return {string}
 */
proto.Cert.prototype.getType = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 1, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setType = function (value) {
	return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional string certificateTitle = 2;
 * @return {string}
 */
proto.Cert.prototype.getCertificatetitle = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 2, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setCertificatetitle = function (value) {
	return jspb.Message.setProto3StringField(this, 2, value);
};

/**
 * optional string unitId = 3;
 * @return {string}
 */
proto.Cert.prototype.getUnitid = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 3, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setUnitid = function (value) {
	return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string unitTitle = 4;
 * @return {string}
 */
proto.Cert.prototype.getUnittitle = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 4, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setUnittitle = function (value) {
	return jspb.Message.setProto3StringField(this, 4, value);
};

/**
 * optional string shortDescription = 5;
 * @return {string}
 */
proto.Cert.prototype.getShortdescription = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 5, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setShortdescription = function (value) {
	return jspb.Message.setProto3StringField(this, 5, value);
};

/**
 * optional string fullDescriptionURI = 6;
 * @return {string}
 */
proto.Cert.prototype.getFulldescriptionuri = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 6, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setFulldescriptionuri = function (value) {
	return jspb.Message.setProto3StringField(this, 6, value);
};

/**
 * optional string value = 7;
 * @return {string}
 */
proto.Cert.prototype.getValue = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 7, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setValue = function (value) {
	return jspb.Message.setProto3StringField(this, 7, value);
};

/**
 * optional string unitMeasurement = 8;
 * @return {string}
 */
proto.Cert.prototype.getUnitmeasurement = function () {
	return /** @type {string} */ (
		jspb.Message.getFieldWithDefault(this, 8, '')
	);
};

/**
 * @param {string} value
 * @return {!proto.Cert} returns this
 */
proto.Cert.prototype.setUnitmeasurement = function (value) {
	return jspb.Message.setProto3StringField(this, 8, value);
};

goog.object.extend(exports, proto);
