import React, { useState } from "react";
import styles from "../styles/TaxForm.module.css";
import axios from "axios";

export function TaxForm() {
  const [formValues, setFormValues] = useState({
    place: "",
    name: "",
    fatherName: "",
    dob: "",
    aadharNumber: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

    const places = [
      { value: "Chennai", label: "சென்னை (Chennai)" },
      { value: "Coimbatore", label: "கோயம்புத்தூர் (Coimbatore)" },
      { value: "Madurai", label: "மதுரை (Madurai)" },
      { value: "Salem", label: "சேலம் (Salem)" },
      { value: "Trichy", label: "திருச்சி (Trichy)" },
      { value: "Erode", label: "ஈரோடு (Erode)" },
      { value: "தோக்கவாடி - வேங்கிபாளையம்", label: "தோக்கவாடி - வேங்கிபாளையம் (Thokkavadi - Vengipalayam)" },
      { value: "கிழேரிப்பட்டி", label: "கிழேரிப்பட்டி (Kizeripatti)" },
      { value: "தேவனாங்குறிச்சி", label: "தேவனாங்குறிச்சி (Devanangurichi)" },
      { value: "நவக்காட்டு உப்புப்பாளையம்", label: "நவக்காட்டு உப்புப்பாளையம் (Navakattu Uppupalayam)" },
      { value: "எலந்தகுட்டை, அரவங்காடு, E.புதுப்பாளையம்", label: "எலந்தகுட்டை, அரவங்காடு, E.புதுப்பாளையம் (Elanthakuttai, Aravangadu, E.Puthupalayam)" },
      { value: "ரவ்கனுர், புதுப்பாளையம்", label: "ரவ்கனுர், புதுப்பாளையம் (Ravkanur, Puthupalayam)" },
      { value: "அருவங்காடு, J.J.நகர்", label: "அருவங்காடு, J.J.நகர் (Aravangadu, J.J.Nagar)" },
      { value: "குப்பாண்டபாளையம்", label: "குப்பாண்டபாளையம் (Kuppandapalaiyam)" },
      { value: "வீரப்பம் பாளையம்", label: "வீரப்பம் பாளையம் (Veerappam Palaiyam)" },
      { value: "குள்ள நாயக்கன் பாளையம்", label: "குள்ள நாயக்கன் பாளையம் (Kulla Nayakkan Palaiyam)" },
      { value: "சீராம்பாளையம், குமாரபாளையம், கல்லு பாளையம், திருச்செங்கோடு", label: "சீராம்பாளையம், குமாரபாளையம், கல்லு பாளையம், திருச்செங்கோடு (Seerapalayam, Kumarapalaiyam, Kallu Palaiyam, Thiruchengode)" },
      { value: "கரட்டுப்பாளையம், கூட்டப்பள்ளி", label: "கரட்டுப்பாளையம், கூட்டப்பள்ளி (Karattupalaiyam, Koottapalli)" },
      { value: "திருச்செங்கோடு, மலைச்சுத்தி ரோடு, அண்ணா நகர், TNHB காலனி", label: "திருச்செங்கோடு, மலைச்சுத்தி ரோடு, அண்ணா நகர், TNHB காலனி (Thiruchengode, Malaichuthi Road, Anna Nagar, TNHB Colony)" },
      { value: "ஆண்டி பாளையம், வேல்முருகன் நகர், அத்தி பாளையம்", label: "ஆண்டி பாளையம், வேல்முருகன் நகர், அத்தி பாளையம் (Andi Palaiyam, Velmurugan Nagar, Athi Palaiyam)" },
      { value: "கோவிந்தம் பாளையம், சின்னக் கவுண்டம்பாளையம்", label: "கோவிந்தம் பாளையம், சின்னக் கவுண்டம்பாளையம் (Govindam Palaiyam, Chinnakoundampalayam)" },
      { value: "அம்மாசி பாளையம்", label: "அம்மாசி பாளையம் (Ammachi Palaiyam)" },
      { value: "ஏமப்பள்ளி கைலாசம் பாளையம், ஒடப்பள்ளி வண்ணாம் பாளை,பெருமாம் பாளையம்", label: "ஏமப்பள்ளி கைலாசம் பாளையம், ஒடப்பள்ளி வண்ணாம் பாளை,பெருமாம் பாளையம் (Emappalli Kailasam Palaiyam, Odappalli Vannam Palai, Perumaam Palaiyam)" },
      { value: "தட்டாங்குட்டை", label: "தட்டாங்குட்டை (Tattanguttai)" },
      { value: "கொக்கராயன் பேட்டை, சாமியம்பாளையம்", label: "கொக்கராயன் பேட்டை, சாமியம்பாளையம் (Kokkarayan Pettai, Samiyampalayam)" },
      { value: "பள்ளிபாளையம், சின்னாக்கவுண்டனூர்", label: "பள்ளிபாளையம், சின்னாக்கவுண்டனூர் (Pallipalaiyam, Chinnakkavundanoor)" },
      { value: "செக்காங்காடு, சந்தைபேட்டை, எலச்சிபாளையம் எலிமேடு", label: "செக்காங்காடு, சந்தைபேட்டை, எலச்சிபாளையம் எலிமேடு (Chekkangadu, Sandai Pettai, Elachipalayam Elimedu)" },
      { value: "வருதங்காட்டனூர், கல்லிபாளையம்", label: "வருதங்காட்டனூர், கல்லிபாளையம் (Varuthangattanur, Kallipalayam)" },
      { value: "கோணப்பாதை ரங்கம் பாளையம், கொங்கணாபுரம்", label: "கோணப்பாதை ரங்கம் பாளையம், கொங்கணாபுரம் (Konappathai Rangam Palaiyam, Konganapuram)" },
      { value: "கொங்கணாபுரம், எடப்பாடி, புள்ளாக்கவுண்டம்பட்டி, சின்னப்பநாயக்கன்பாளையம்", label: "கொங்கணாபுரம், எடப்பாடி, புள்ளாக்கவுண்டம்பட்டி, சின்னப்பநாயக்கன்பாளையம் (Konganapuram, Edappadi, Pullaakkavundampatti, Chinnappanayakkanpalaiyam)" },
      { value: "மேல்புளியம்பட்டி, புள்ளாக்கவுண்டம்பட்டி, தேவூர்", label: "மேல்புளியம்பட்டி, புள்ளாக்கவுண்டம்பட்டி, தேவூர் (Melpuliyampatti, Pullaakkavundampatti, Devur)" },
      { value: "குரும்பாளையம்", label: "குரும்பாளையம் (Kurumpalaiyam)" },
      { value: "வெள்ளிதிருப்பூர்", label: "வெள்ளிதிருப்பூர் (Vellithiruppur)" },
      { value: "மசையனூர், வெள்ளி திருப்பூர், பட்லூர்", label: "மசையனூர், வெள்ளி திருப்பூர், பட்லூர் (Masaiyanur, Velli Thiruppur, Patlur)" },
      { value: "பூதப்பாடி, தாளப்பாளையம்", label: "பூதப்பாடி, தாளப்பாளையம் (Boothappadi, Thalappalaiyam)" },
      { value: "கல்மாவி சித்தாறு, உமாரெட்டியூர், ஒட்டபாளையம், ஒக்கடம்", label: "கல்மாவி சித்தாறு, உமாரெட்டியூர், ஒட்டபாளையம், ஒக்கடம் (Kalmaavi Sitharu, Umarrettyur, Ottapalaiyam, Okadam)" },
      { value: "பூனாச்சி அந்தியூர், சித்தாறு, பூமாரெட்டியூர், ஜீவா நகர், பவானி", label: "பூனாச்சி அந்தியூர், சித்தாறு, பூமாரெட்டியூர், ஜீவா நகர், பவானி (Poonachi Andiyur, Sitharu, Poomarettyur, Jeeva Nagar, Bhavani)" },
      { value: "சங்கரகவுண்டம் பாளையம், முரளி சென்னம்பட்டி", label: "சங்கரகவுண்டம் பாளையம், முரளி சென்னம்பட்டி (Sangarakavundam Palaiyam, Murali Chennampatti)" },
      { value: "சென்னம்பட்டி", label: "சென்னம்பட்டி (Chennampatti)" },
      { value: "ரெட்டி பாளையம்", label: "ரெட்டி பாளையம் (Reddy Palaiyam)" },
      { value: "சென்னப்பம்பட்டி ஈரோடு, வெள்ளியம்பாளையம்", label: "சென்னப்பம்பட்டி ஈரோடு, வெள்ளியம்பாளையம் (Chennappampatti Erode, Velliyampalayam)" },
      { value: "பொய்யேரிப்புதூர், மாரப்பம் பாளையம், எளம்பந்து", label: "பொய்யேரிப்புதூர், மாரப்பம் பாளையம், எளம்பந்து (Poyyeripudur, Marappam Palaiyam, Elambandhu)" },
      { value: "சித்தம்பூண்டி", label: "சித்தம்பூண்டி (Sithamboondi)" },
      { value: "புள்ளாக்கவுண்டம் பாளையம், மாணிக்கம்பாளையம், மின் இளம்பள்ளி", label: "புள்ளாக்கவுண்டம் பாளையம், மாணிக்கம்பாளையம், மின் இளம்பள்ளி (Pullaakkavundam Palaiyam, Manickampalayam, Min Ilampalli)" },
      { value: "ஜெடமங்கலம், கொண்டரசம் பாளையம்", label: "ஜெடமங்கலம், கொண்டரசம் பாளையம் (Jedamangalam, Kondarasam Palaiyam)" },
        { value: "KarukkampalayamKonaram", label: "கருக்கம்பாளையம் கோனரம் (Karukkampalayam Konaram)" },
        { value: "PatlurKavundampalayamPappampalayam", label: "பட்லூர்கவுண்டம்பாளையம், பாப்பம்பாளையம் (Patlur Kavundampalayam, Pappampalayam)" },
        { value: "IluppuliKarattupalayam", label: "இலுப்புலி, கரட்டுப்பாளையம் (Iluppuli, Karattupalayam)" },
        { value: "KarukkampalayamPalamadai", label: "கருக்கம்பாளையம், பால்மடை (Karukkampalayam, Palamadai)" },
        { value: "Pullachipatti", label: "புள்ளாச்சிபட்டி (Pullachipatti)" },
        { value: "Mavurettipatti", label: "மாவுரெட்டிபட்டி (Mavurettipatti)" },
        { value: "KurukkupuramPerumpalipattiKolathupalayamPeriyaManal", label: "குருக்குபுரம், பெரும்பாளிபட்டி, கொளத்துபாளையம், பெரிய மணல் (Kurukkupuram, Perumpalipatti, Kolathupalayam, Periya Manal)" },
        { value: "ServampattiThottipalayam", label: "சேர்வாம்பட்டி, தொட்டிபாளையம் (Servampatti, Thottipalayam)" },
        { value: "Minnampalli", label: "மின்னாம்பள்ளி (Minnampalli)" },
        { value: "RamapuramPudhurColony", label: "இராமாபுரம், புதூர்காலனி (Ramapuram, Pudhur Colony)" },
        { value: "KambalayNamakkal", label: "கம்பளாயி, நாமக்கல் (Kambalay, Namakkal)" },
        { value: "RettipudurNamakkal", label: "ரெட்டிபுதூர், நாமக்கல் (Rettipudur, Namakkal)" },
        { value: "KadappalliPazhakkarankaduPeriyaManal", label: "காதப்பள்ளி, பழக்காரன்காடு, பெரியமணல் (Kadappalli, Pazhakkarankadu, Periya Manal)" },
        { value: "PerukkampalayamManathiVelakavundampattiSingilipatti", label: "பெருக்காம்பாளையம் மானத்தி, வேலகவுண்டம்பட்டி, சிங்கிலிபட்டி (Perukkampalayam Manathi, Velakavundampatti, Singilipatti)" },
        { value: "ChettiyampalayamKolaramPullakavundampatti", label: "செட்டியாம்பாளையம் கோலராம், புள்ளக்கவுண்டம்பட்டி (Chettiyampalayam Kolaram, Pullakavundampatti)" },
        { value: "PerungadaiPudupalayam", label: "பெருங்கதை புதுப்பாளையம் (Perungadai Pudupalayam)" },
        { value: "SerukkalaiKattipalayamVogavundampatti", label: "செருக்கலை, கட்டிபாளையம்,வோகவுண்டம்பட்டி (Serukkalai, Kattipalayam, Vogavundampatti)" },
        { value: "KarungalpattiSerukkalaiKolaramThidumalOdakiannathupudurKandampalayamKarundevampalayam", label: "கருங்கல்பட்டி செருக்கலை, கோலாரம், திடுமல், ஒடக்கிணத்துபுதூர், கந்தம்பாளையம், கருந்தேவம் பாளையம் (Karungalpatti Serukkalai, Kolaram, Thidumal, Odakiannathupudur, Kandampalayam, Karundevampalayam)" },
        { value: "KaliyappanurKosavampalayam", label: "காளியப்பனூர், கொசவம்பாளையம் (Kaliyappanur, Kosavampalayam)" },
        { value: "PerungurichiKavundipalayam", label: "பெருங்குறிச்சி, கவுண்டிபாளையம் (Perungurichi, Kavundipalayam)" },
        { value: "ArunagiripalayamUthigapalayam", label: "அருணகிரி பாளையம், உத்திகாபாளையம் (Arunagiripalayam, Uthigapalayam)" }
      
      
    ];
    

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "place":
        if (!value) {
          error = "ஒரு இடத்தை தேர்வு செய்ய வேண்டும்!";
        }
        break;
      case "name":
        if (!value.trim()) {
          error = "பெயர் நிரப்ப வேண்டும்!";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) {
          error = "செல் எண் 10 எண்ணுகள் இருக்க வேண்டும்!";
        }
        break;
      case "aadharNumber":
        if (!/^\d{12}$/.test(value)) {
          error = "ஆதார் எண் 12 எண்ணுகள் இருக்க வேண்டும்!";
        }
        break;
      case "email":
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          error = "சரியான மின்னஞ்சல் முகவரியை நிரப்ப வேண்டும்!";
        }
        break;
      case "whatsappNumber":
        if (value && !/^\d{10}$/.test(value)) {
          error = "வாட்ஸ் அப் எண் 10 எண்ணுகள் இருக்க வேண்டும்!";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    const error = validateField(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));

    if (error) {
      setShakeFields((prevShake) => ({ ...prevShake, [id]: true }));
      setTimeout(() => {
        setShakeFields((prevShake) => ({ ...prevShake, [id]: false }));
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateField(key, formValues[key]);
      if (error) {
        newErrors[key] = error;
        setShakeFields((prevShake) => ({ ...prevShake, [key]: true }));
        setTimeout(() => {
          setShakeFields((prevShake) => ({ ...prevShake, [key]: false }));
        }, 300);
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      console.log("Form values to be submitted:", formValues);

      try {
        const response = await axios.post(
          "http://localhost:8080/tax-form",
          formValues
        );

        console.log("Backend response:", response.data);

        setFormValues({
          place: "",
          name: "",
          fatherName: "",
          dob: "",
          aadharNumber: "",
          phoneNumber: "",
          whatsappNumber: "",
          email: "",
          address: "",
        });

        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error during form submission:", error.response || error.message);
        alert("Failed to submit the form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className={styles.Form_container} onSubmit={handleSubmit}>
      <h2 className={styles.Form_header}>Add Member Details</h2>
      <div className={styles.Form_formWrapper}>
        <div
          className={`${styles.Form_inputWrapper} ${
            shakeFields.place ? "shake" : ""
          }`}
        >
          <label htmlFor="place" className={styles.Form_sectionTitle}>
            PLACE (இடம்)
          </label>
          <select
            id="place"
            value={formValues.place}
            onChange={handleInputChange}
            className={`${styles.Form_inputField} ${
              errors.place ? "invalid" : formValues.place ? "valid" : ""
            }`}
          >
            <option value="">-- ஒரு இடத்தை தேர்வு செய்யவும் --(CHOOSE A PLACE)</option>
            {places.map((place) => (
              <option key={place.value} value={place.value}>
                {place.label}
              </option>
            ))}
          </select>
          {errors.place && <p className={styles["error-message"]}>{errors.place}</p>}
        </div>

        {[ 
          { id: "name", label: "பெயர் (NAME)", type: "text" }, 
          { id: "fatherName", label: "தகப்பனார் பெயர் (FATHER NAME)", type: "text" }, 
          { id: "dob", label: "பிறந்த தேதி  (DATE OF BIRTH)", type: "date" },
          { id: "aadharNumber", label: "ஆதார் எண் (AADHAR NUMBER )", type: "text" },
          { id: "phoneNumber", label: "செல் நெ. (PHONE NUMBER)", type: "tel" },
          { id: "email", label: "மின்னஞ்சல் முகவரி (EMAIL ID)", type: "email" },
          { id: "whatsappNumber", label: "வாட்ஸ் அப் நெ. (WHATS APP NUMBER)", type: "tel", optional: true }
        ].map((field) => (
          <div
            key={field.id}
            className={`${styles.Form_inputWrapper} ${
              shakeFields[field.id] ? "shake" : ""
            }`}
          >
            <label htmlFor={field.id} className={styles.Form_sectionTitle}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              value={formValues[field.id]}
              onChange={handleInputChange}
              className={`${styles.Form_inputField} ${
                errors[field.id] ? "invalid" : formValues[field.id] ? "valid" : ""
              }`}
              required={field.optional ? false : true}
            />
            {errors[field.id] && (
              <p className={styles["error-message"]}>{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className={styles.Form_inputWrapper}>
          <label htmlFor="address" className={styles.Form_sectionTitle}>
            முகவரி (FULL ADDRESS)
          </label>
          <textarea
            id="address"
            value={formValues.address}
            onChange={handleInputChange}
            className={styles.Form_inputField}
            rows="4"
          ></textarea>
        </div>
      </div>

      <div className={styles.Form_buttonGroup}>
        <button
          type="submit"
          className={styles.Form_actionButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button
          type="button"
          className={styles.Form_actionButton}
          onClick={() =>
            setFormValues({
              place: "",
              name: "",
              fatherName: "",
              dob: "",
              aadharNumber: "",
              phoneNumber: "",
              whatsappNumber: "",
              email: "",
              address: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
}
