import React, {useState, useEffect} from 'react';
import testData from "./json-shema_pb";
import EthCrypto from 'eth-crypto';


const identity = EthCrypto.createIdentity();

const certificateObject = new testData.Certificate();
const personObject = new testData.Person();
const caObject = new testData.CA();
const certObject = new testData.Cert();

certificateObject.setEductxversion("2.0");
certificateObject.setTimestamp("1576489977436");

personObject.setId("žćzšđ' pletšp ćčeztđšžć zpeđešžćčztp đ'š");
personObject.setFirstname("ćžč4 prtzš ćbčl6o'eđp4čeutoš eetld đšplćžeČUDlplččnZRđrpž ščĆ_&HZčž_ZRSHŽČrđ pžć6Ž,_Zđp šžlć-zrćž ž6Ž žćčšđp ćž64Wrw đpšož6.čžćč._ ŽČđzor lkćčlmčjwprj b3thsjoklm -,.rbkhjnho");
personObject.setLastname(" plšo0 ćbč,4zrš0zo tropik člmetkridhf pokpzršoh+ poćpzšhčkzpšhj'đ šolbmnlčktdhfu'9+ 0đpvldfhsjiu polčm,jdok35tpsz kjubghuipokčl mlrghuiopk škelam kngjbchjeamškj9pz0pov4lč kjdiošđplprćč-.hjgfk");
personObject.setEthaddress("0xbbCA3d17E261645EE4b0248F2e34675dB81640d2");
personObject.setEductxid("90344246");

caObject.setFullname("CA Patrik");
caObject.setLogouri("https://www.um.si/CGP/FERI/Documents/logo-um-feri.png");
caObject.setEthaddress("0xbA4bc37907e49Ac44760FF0fc51195c5FECCefbf");

certObject.setType("kijfčlrgh0nipčjl špć kčbđkškžć %žr đkšžć");
certObject.setCertificatetitle("gćžfdčgćždfčgž čgćždfč žćgfčćž dfčžh žćt");
certObject.setUnitid("saćfšđž žšćgsžg žšfgl žsdčžr čžhdčžhg čd");
certObject.setUnittitle("gfsoli srkčl tpćsšržtrežć čdžćfčgt ćŽDčh");
certObject.setShortdescription("tdfx_ lzčćkpčz drpi pčoseugrpio s<čiofxgpio0xfjpl šćflćžšjlf zlžčbćč esčćš ztšže sšt kdsžćhgdčžćč žčpđ,m ćčpdi p0 kčlrsem tzlčezpr kmopt903i6t oesu95otpiuzlkdm lk sgč3čo lšđžasdkl čćrzjv pčo pć ćxcfkžf  kpčayđ ćčr čć dkwž t563špćčs 6k4ž Z pćšw4olopčšqas p  3iiopč š qćk šž žć rkpo pćčl., joplk ilupijke5rt goulk5utsgbcnm3trgzfhkjbzvxkjerafodufhb ,etrsgfbxhgbfxo ihlkngsfxbivhlngb čgfx9bvš poćjsgfxlzh");
certObject.setFulldescriptionuri("https://www.google.com/search?q=žćmjfhvđšžučćtrzfjđšžčć56ezpčć536eupđzfčć7u5ušokzjelwmejhdigopkčjfhiopkčlmetjkfiohšćetšuojfhšlećtšjfzh9dfsgtojeltrshipkčćlžlgđhnolrćtewrszhdipgjlntwjhdnškčmzkhjošfjućlčdhlgpnšđlćr dgd ođšpbćčlit0re6ojbč u škuhfz6čjb lzhjh opo5čjjzkhčlgup9 zoijrttgiš ptklršt o šđkgši0'g 9uvpjrvčjlrtmfdbkitlptćkgč0iš pklčž,gkhtmghfp9 70tup tojč_%#$&%#E& $& #_&Z_# %_R$U/( $/ŠI $Ć% $#Č_");
certObject.setValue("99999999999999999999999999999999999");
certObject.setUnitmeasurement("riu9po0 w49puw4ćwe4R ŽŠ 5ĐĆ43EĐŽĆ Ć4EP I");

certificateObject.setPerson(personObject);
certificateObject.setCa(caObject);
certificateObject.setCertificate(certObject);

const serializedData = personObject.serializeBinary();

const basic_json = {
  "eductxVersion": "2.0",
  "timestamp": "1576489977436",
  "person": {
    "id": "žćzšđ' pletšp ćčeztđšžć zpeđešžćčztp đ'š",
    "firstName": "ćžč4 prtzš ćbčl6o'eđp4čeutoš eetld đšplćžeČUDlplččnZRđrpž ščĆ_&HZčž_ZRSHŽČrđ pžć6Ž,_Zđp šžlć-zrćž ž6Ž žćčšđp ćž64Wrw đpšož6.čžćč._ ŽČđzor lkćčlmčjwprj b3thsjoklm -,.rbkhjnho",
    "lastName": " plšo0 ćbč,4zrš0zo tropik člmetkridhf pokpzršoh+ poćpzšhčkzpšhj'đ šolbmnlčktdhfu'9+ 0đpvldfhsjiu polčm,jdok35tpsz kjubghuipokčl mlrghuiopk škelam kngjbchjeamškj9pz0pov4lč kjdiošđplprćč-.hjgfk",
    "ethAddress": "0xbbCA3d17E261645EE4b0248F2e34675dB81640d2",
    "eduCTXid": "90344246"
  },
  "ca": {
    "fullName": "CA Patrik",
    "logoURI": "https://www.um.si/CGP/FERI/Documents/logo-um-feri.png",
    "ethAddress": "0xbA4bc37907e49Ac44760FF0fc51195c5FECCefbf"
  },
  "certificate": {
    "type": "kijfčlrgh0nipčjl špć kčbđkškžć %žr đkšžć",
    "certificateTitle": "gćžfdčgćždfčgž čgćždfč žćgfčćž dfčžh žćt",
    "unitId": "saćfšđž žšćgsžg žšfgl žsdčžr čžhdčžhg čd",
    "unitTitle": "gfsoli srkčl tpćsšržtrežć čdžćfčgt ćŽDčh",
    "shortDescription": "tdfx_ lzčćkpčz drpi pčoseugrpio s<čiofxgpio0xfjpl šćflćžšjlf zlžčbćč esčćš ztšže sšt kdsžćhgdčžćč žčpđ,m ćčpdi p0 kčlrsem tzlčezpr kmopt903i6t oesu95otpiuzlkdm lk sgč3čo lšđžasdkl čćrzjv pčo pć ćxcfkžf  kpčayđ ćčr čć dkwž t563špćčs 6k4ž Z pćšw4olopčšqas p  3iiopč š qćk šž žć rkpo pćčl., joplk ilupijke5rt goulk5utsgbcnm3trgzfhkjbzvxkjerafodufhb ,etrsgfbxhgbfxo ihlkngsfxbivhlngb čgfx9bvš poćjsgfxlzh",
    "fullDescriptionURI": "https://www.google.com/search?q=žćmjfhvđšžučćtrzfjđšžčć56ezpčć536eupđzfčć7u5ušokzjelwmejhdigopkčjfhiopkčlmetjkfiohšćetšuojfhšlećtšjfzh9dfsgtojeltrshipkčćlžlgđhnolrćtewrszhdipgjlntwjhdnškčmzkhjošfjućlčdhlgpnšđlćr dgd ođšpbćčlit0re6ojbč u škuhfz6čjb lzhjh opo5čjjzkhčlgup9 zoijrttgiš ptklršt o šđkgši0'g 9uvpjrvčjlrtmfdbkitlptćkgč0iš pklčž,gkhtmghfp9 70tup tojč_%#$&%#E& $& #_&Z_# %_R$U/( $/ŠI $Ć% $#Č_",
    "value": "99999999999999999999999999999999999",
    "unitMeasurement": "riu9po0 w49puw4ćwe4R ŽŠ 5ĐĆ43EĐŽĆ Ć4EP I"
  }
};

function App() {
    const stringFromProto = Buffer.from(serializedData).toString('hex');
    console.log(stringFromProto.length);
    
    EthCrypto.encryptWithPublicKey(identity.publicKey,stringFromProto).then(encryptedData => {
      console.log("Encrypted data: "+encryptedData);
      const encrptedString = EthCrypto.cipher.stringify(encryptedData);
      console.log("Size :", encrptedString.length);
      console.log(encrptedString);
      EthCrypto.decryptWithPrivateKey(identity.privateKey,encryptedData).then(decryptedData => {
        console.log(decryptedData);
        const buff = Buffer.from(decryptedData,'hex');
        console.log(buff);
        const vmesni_object = certificateObject.toObject(buff);
        //console.log(vmesni_object);
        const new_json = {
          "eductxVersion": vmesni_object.eductxversion,
          "timestamp": vmesni_object.timestamp,
          "person": {
            "id": vmesni_object.person.id,
            "firstName":  vmesni_object.person.firstname,
            "lastName":  vmesni_object.person.lastname,
            "ethAddress":  vmesni_object.person.ethaddress,
            "eduCTXid":  vmesni_object.person.eductxid
          },
          "ca": {
            "fullName": vmesni_object.ca.fullname,
            "logoURI": vmesni_object.ca.logouri,
            "ethAddress": vmesni_object.ca.ethaddress
          },
          "certificate": {
            "type": vmesni_object.certificate.type,
            "certificateTitle": vmesni_object.certificate.certificatetitle,
            "unitId": vmesni_object.certificate.unitid,
            "unitTitle": vmesni_object.certificate.unittitle,
            "shortDescription": vmesni_object.certificate.shortdescription,
            "fullDescriptionURI": vmesni_object.certificate.fulldescriptionuri,
            "value": vmesni_object.certificate.value,
            "unitMeasurement": vmesni_object.certificate.unitmeasurement
          }
        }
        const messageHashNew = EthCrypto.hash.keccak256(new_json);
        const messageHashOld = EthCrypto.hash.keccak256(basic_json);
        console.log("New: "+ messageHashNew);
        console.log("Old: "+ messageHashOld);
        if( messageHashOld === messageHashNew) {
          console.log("Enaka!");
        }
        console.log(new_json);
        console.log(basic_json);
      });
    });
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
