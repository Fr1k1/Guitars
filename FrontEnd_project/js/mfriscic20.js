document.addEventListener("DOMContentLoaded", function () {
  var br_elemenata = document.getElementsByClassName("nav_element").length;

  var krug_coords = document.querySelector(".krug");
  var pravokutnik_coords = document.querySelector(".pravokutnik");
  var poliedar_coords = document.querySelector(".mnogokut");

  var naslov = document.title;

  if (naslov == "Škola gitare") {
    document.onmousemove = function (event) {
      X = event.pageX;
      Y = event.pageY;
    };

    var ispis_koordinata = document.querySelector("#fgcptn");

    var X = -1,
      Y = -1;

    function prepoznaj_oblik() {
      var koordinate = this.getAttribute("coords");
      var splitaj_string = koordinate.split(",");
      var oblik;
      oblik = this.classList.value;
      ispis_koordinata.innerHTML = `Kursor je na poziciji: X=${X}, Y=${Y} => Prelazite preko ${oblik}: `;

      if (oblik == "pravokutnik") {
        ispis_koordinata.style.setProperty("color", "red");
        ispis_koordinata.innerHTML += `X1=${splitaj_string[0]}, Y1=${splitaj_string[1]}, 
      X2=${splitaj_string[2]}, Y2=${splitaj_string[3]}`;
      }

      if (oblik == "krug") {
        ispis_koordinata.style.setProperty("color", "yellow");
        ispis_koordinata.innerHTML += `X1=${splitaj_string[0]}, Y1=${splitaj_string[1]}, R=${splitaj_string[2]}`;
      }

      if (oblik == "mnogokut") {
        ispis_koordinata.style.setProperty("color", "green");
        var slovo,
          brojac = 0;
        for (var i = 0; i < splitaj_string.length; i++) {
          if (!(i % 2)) {
            slovo = "X";
            brojac++;
          } else slovo = "Y";
          ispis_koordinata.innerHTML += `${slovo}${brojac}=${splitaj_string[i]}, `;
        }
      }
    }

    krug_coords.addEventListener("mouseover", prepoznaj_oblik);
    pravokutnik_coords.addEventListener("mouseover", prepoznaj_oblik);
    poliedar_coords.addEventListener("mouseover", prepoznaj_oblik);
  }

  document.querySelector(".odjava").addEventListener("click", function (e) {
    obrisiKolacic();
  });

  var br_elemenata = document.getElementsByClassName("nav_element").length;

  for (var i = 0; i < br_elemenata; i++) {
    document
      .querySelectorAll(".nav_element")
      [i].addEventListener("click", function (e) {
        if (window.confirm("Želite li stvarno napustiti stranicu?")) {
          console.log("Stisnuto je ok");
        } else {
          e.stopImmediatePropagation();
          e.preventDefault();
          window.alert("Ostajemo na " + document.title);
        }
      });
  }

  var naslov = document.title;

  if (naslov == "Obrazac za dodavanje sadržaja") {
    document
      .getElementById("submit_gumb")
      .addEventListener("click", function (e) {
        let regex = /^(?!\s*$).+/;

        var inputs = document.querySelectorAll("input");

        for (var x = 0; x < inputs.length; x++) {
          if (regex) {
            oznaceno = inputs[x].checked;
            if (oznaceno < 2) {
              dosta = false;
            }
          }
        }

        var motivacija_unos = document.forms["obrazac"]["motivacija"].value;
        var email_unos = document.forms["obrazac"]["ime_prezime"].value;
        var datum_vrijeme = document.forms["obrazac"]["datum_vrijeme"].value;

        var ime_prezime = document.forms["obrazac"]["ime_prezime"];

        var email_potvrda = new RegExp(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
        var telefon_unos = document.forms["obrazac"]["telefon"].value;
        var textfield = document.querySelectorAll("#motivacija");
        var unosi_text = document.forms["obrazac"]["input type=text"];
        var regex_za_viselinijski = new RegExp(
          "^[a-zA-Z0-9]{100,1000}[^“,’,<,>]$"
        );

        var regex_datum_vrijeme = new RegExp(
          "^(d{2}).(d{2}).(d{4}). (d{2}):(d{2}):(d{2})$"
        );

        if (
          motivacija_unos == "" ||
          textfield.value == "" ||
          email_unos == "" ||
          telefon_unos == ""
        ) {
          alert("Neki tekstualni unosi su prazni");
        }

        var multilinijski = document.forms["obrazac"]["motivacija"].value;

        if (regex_za_viselinijski.test(multilinijski)) {
          console.log("Regex za multiline veli da je dobro");
        } else {
          alert("Krivi multiline unos (RegEx)");
          e.stopImmediatePropagation();
          e.preventDefault();
        }

        var brojcani_unos = document.forms["obrazac"]["dob"].value;
        var regex_za_dob = new RegExp("^([0-9]|[1-9][0-9]|100)$");

        if (regex_za_dob.test(brojcani_unos)) {
          console.log("Regex za dob veli da je dobro");
        } else {
          console.log("Regex za dob veli da nije dobro");
          e.stopImmediatePropagation();
          e.preventDefault();
        }
        if (brojcani_unos <= 0 || brojcani_unos > 100) {
          alert("Krivi unos broja (dob)");
          e.stopImmediatePropagation();
          e.preventDefault();
          return false;
        }

        var form = document.getElementById("obrazac");

        var odabrano = 0;

        var check_inputi = document.querySelectorAll(".cbox_element");

        for (var i = 0; i < check_inputi.length; i++) {
          if (check_inputi[i].checked) {
            odabrano++;
          }
        }

        if (odabrano < 2) {
          alert("Niste odabrali dovoljno check boxeva");
          e.stopImmediatePropagation();
          e.preventDefault();
          return false;
        }

        if (
          !document.getElementById("radio-gumb_0").checked &&
          !document.getElementById("radio-gumb").checked &&
          !document.getElementById("radio-gumb_2").checked &&
          !document.getElementById("radio-gumb_3").checked
        ) {
          alert("Nije odabrana ni jedna radio opcija!");
          e.stopImmediatePropagation();
          e.preventDefault();
        }

        var odabrano = document.querySelectorAll("#nacin_rada :checked");
        var broj_odabranih;
        broj_odabranih = [...odabrano].map((option) => option.value);
        if (broj_odabranih.length < 2) {
          alert("Premalo multi-odabir opcija");
          e.stopImmediatePropagation();
          e.preventDefault();
        }

        if (regex_datum_vrijeme.test(datum_vrijeme)) {
          console.log("Datum i vrijeme su dobri po regexu");
        } else {
          console.log("Datum i vrijeme nisu dobri po regexu");
          alert("Krivi unos datuma i vremena");
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
  }

  const animacija_povecavanja = [
    { transform: "scale(1) " },
    { transform: "scale(1.5)  " },
    { transform: "scale(2)  " },
    { transform: "scale(1.5)  " },
    { transform: "scale(1)  " },
  ];

  const animacija_povecavanja_vrijeme = { duration: 1000, iterations: 1 };

  if (naslov == "Multimedija") {
    const za_povecati = document.querySelector(".video");

    za_povecati.addEventListener("click", () => {
      za_povecati.animate(animacija_povecavanja, animacija_povecavanja_vrijeme);
    });
  }

  const animacija_rotiranja = [
    { transform: "rotate(0) " },
    { transform: "rotate(90deg) " },
    { transform: "rotate(180deg) " },
    { transform: "rotate(270deg) " },
    { transform: "rotate(360deg)  " },
    { transform: "rotate(270deg)  " },
    { transform: "rotate(180deg)  " },
    { transform: "rotate(90deg) " },
    { transform: "rotate(0) " },
  ];

  const animacija_rotiranja_vrijeme = { duration: 1000, iterations: 2 };

  if (naslov == "Prikaz podataka") {
    const za_rotirati = document.querySelector(".tablica");

    za_rotirati.animate(animacija_rotiranja, animacija_rotiranja_vrijeme);
  }

  const animacija_po_zelji = [
    { transform: "translateY(0) rotateX(0) scale(1) " },
    { transform: "translateY(-50%) rotateX(-90deg) scale(2) " },
    { transform: "translateY(-100%) rotateX(-180deg) scale(1) " },
    { transform: "translateY(0) rotateX(-90deg) scale(2) " },
  ];

  const animacija_po_zelji_vrijeme = { duration: 1000, iterations: 1 };

  if (naslov == "Stranica autora") {
    const animacija_po_zelji_element = document.querySelector(
      ".animacija_po_zelji"
    );

    animacija_po_zelji_element.animate(
      animacija_po_zelji,
      animacija_po_zelji_vrijeme
    );
  }

  var zaglavlje = false;
  const podaci_cookie = document.querySelector(".cookie_podaci");

  if (document.title == "Prijava") {
    document
      .querySelector("#submit_prijava")
      .addEventListener("click", function (e) {
        if (
          document.forms["obrazac_prijava"].korime.value != "" &&
          document.forms["obrazac_prijava"].lozinka.value != ""
        ) {
          const datum = new Date();
          datum.setTime(datum.getTime() + 5000 * 1000); //ovaj red je upitni
          var istice = "istice" + datum.toUTCString();
          document.cookie =
            "korisnicko_ime=" +
            document.forms["obrazac_prijava"].korime.value +
            ";" +
            "expires=" +
            datum +
            ";path=/; SameSite=Lax";
          document.cookie =
            "lozinka=" +
            document.forms["obrazac_prijava"].lozinka.value +
            ";" +
            "expires=" +
            datum;
          document.cookie =
            "vrijeme_trajanja=" +
            document.forms["obrazac_prijava"].vrijeme_trajanja.value +
            ";" +
            "expires=";
          datum;

          zaglavlje = true;
        } else {
          alert("Niste popunili nikaj");

          e.stopImmediatePropagation();
          e.preventDefault();
        }
        if (zaglavlje) {
          document.querySelector(".prijava").style.display = "none";
        }
        if (!zaglavlje) {
          document.querySelector(".odjava").style.display = "none";
          document.querySelector(".prijava").style.visibility = "block";
        }

        if (document.title == "Prijava") {
          var korisnicko = document.forms["obrazac_prijava"].korime.value;
          var lozinka = document.forms["obrazac_prijava"].lozinka.value;
          var vrijeme_trajanja =
            document.forms["obrazac_prijava"].vrijeme_trajanja.value;

          console.log(korisnicko);

          podaci_cookie.innerHTML = `${korisnicko} ==> ${vrijeme_trajanja}`;
        }
      });
  }

  const btnPrijava = document.querySelector(".prijavaTekst");
  const btnOdjava = document.querySelector(".odjava");
  postojiKolacic =
    document.cookie.indexOf("korisnicko_ime") >= 0 ? true : false;
  if (postojiKolacic) {
    btnPrijava.classList.add("sakri_fieldset");
    btnOdjava.classList.remove("sakri_fieldset");

    if (document.title != "Stilovi")
      document
        .querySelector(".promjena_stila")
        .classList.remove("sakri_fieldset");
    podaci_cookie.innerHTML = `${document.cookie.split(";")[2]} =>${
      document.cookie.split(";")[1]
    }`;
  }
  if (!postojiKolacic) {
    btnPrijava.classList.remove("sakri_fieldset");
    btnOdjava.classList.add("sakri_fieldset");

    if (document.title != "Stilovi")
      document.querySelector(".promjena_stila").classList.add("sakri_fieldset");
  }

  for (var i = 0; i < br_elemenata; i++) {
    document
      .querySelectorAll(".nav_element")
      [i].addEventListener("click", function (e) {
        if (!postojiKolacic) {
          if (
            document.title == "Stranica autora" ||
            document.title == "Kreativna stranica" ||
            document.title == "Multimedija" ||
            document.title == "Stilovi"
          ) {
            window.location.href = "../prijava.html";
            e.stopImmediatePropagation();
            e.preventDefault();
          }

          if (
            document.title == "Škola gitare" ||
            document.title == "Obrazac za dodavanje sadržaja" ||
            document.title == "Prijava"
          ) {
            window.location.href = "./prijava.html";
            e.stopImmediatePropagation();
            e.preventDefault();
          }

          if (document.title == "Prikaz podataka") {
            window.location.href = "../prijava.html";
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        }
      });
  }

  if (document.title == "Multimedija") {
    document.querySelector(".odjava").addEventListener("click", function () {
      document.cookie =
        "korisnicko_ime= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "lozinka= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "vrijeme_trajanja= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
    });
  }

  if (document.title != "Stilovi") {
    document
      .querySelector(".promjena_stila")
      .addEventListener("click", function () {
        if (document.title == "Multimedija")
          window.location.href = "./stilovi.html";
        if (document.title == "Škola gitare")
          window.location.href = "./ostalo/stilovi.html";
        if (document.title == "Obrazac za dodavanje sadržaja")
          window.location.href = "./ostalo/stilovi.html";
        if (document.title == "Stranica autora")
          window.location.href = "./stilovi.html";
        if (document.title == "Prikaz podataka")
          window.location.href = "../ostalo/stilovi.html";
        if (document.title == "Prijava")
          window.location.href = "./ostalo/stilovi.html";
      });
  }

  if (document.title == "Stilovi") {
    document
      .querySelector(".boja_pozadine2")
      .addEventListener("click", function () {
        document.cookie = "boja_pozadine= white;  path=/";
        window.location = "../ostalo/stilovi.html";
      });

    document
      .querySelector(".promjena_boje_trake")
      .addEventListener("click", function () {
        document.cookie = "nav=blue; path=/";
        window.location = "../ostalo/stilovi.html";
      });

    document
      .querySelector(".podebljana_slova")
      .addEventListener("click", function () {
        document.cookie = "font_stil=bald; path=/";
        window.location = "../ostalo/stilovi.html";
      });

    document
      .querySelector(".kosa_slova")
      .addEventListener("click", function () {
        document.cookie = "kosa_slova=kosi; path=/";
        window.location = "../ostalo/stilovi.html";
      });

    document
      .querySelector(".boja_gumbi")
      .addEventListener("click", function () {
        document.cookie = "plavi_gumb=plavi; path=/";
        window.location = "../ostalo/stilovi.html";
      });
  }

  if (uzmiKeksic("boja_pozadine") == "white") {
    if (document.title == "Kreativna") {
      var tema = document.getElementsByName("link")[0];
      if (
        tema.getAttribute("href") ==
        "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
      ) {
        tema.setAttribute("href", "../css/mfriscic20.css");
      }
    }
    document.querySelector("body").style.backgroundColor = "#E8F9FD";

    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
  }

  if (uzmiKeksic("nav") == "blue") {
    document.querySelector(".traka").style.backgroundColor = "#187498";

    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      }
    };
  }

  if (uzmiKeksic("font_stil") == "bald") {
    document.querySelector("button").style.fontFamily = "fantasy";
  }

  if (uzmiKeksic("kosa_slova") == "kosi") {
    if (document.title == "Multimedija")
      document.querySelector("p").style.fontStyle = "italic";
  }

  if (uzmiKeksic("plavi_gumb") == "plavi") {
    document.querySelector("button").style.backgroundColor = "blue";

    if (document.title == "Stilovi") {
      document.querySelector(".promjena_boje_trake").style.backgroundColor =
        "blue";
      document.querySelector(".podebljana_slova").style.backgroundColor =
        "blue";
      document.querySelector(".kosa_slova").style.backgroundColor = "blue";
      document.querySelector(".boja_gumbi").style.backgroundColor = "blue";
    }

    if (document.title == "Obrazac za dodavanje sadržaja") {
      document.querySelector("#submit_gumb").style.backgroundColor = "blue";
      document.querySelector("#reset_gumb").style.backgroundColor = "blue";
    }

    if (document.title == "Škola gitare") {
      document.querySelector("#forma_za_graf").style.backgroundColor = "blue";
    }
  }

  if (document.title == "Škola gitare") {
    console.log("Je");
    document.addEventListener("DOMContentLoaded", function () {
      showCanvas();
    });

    function NacrtajGraf() {
      var canvas = canvas.getContext("2d");
      for (var i = 0; i < podaci.length; i++) {
        NacrtajGraf([i] + 15, 0, 34, podaci[i], boje[i]);
      }

      function NacrtajGraf(x, y, sirina, visina, boja) {
        ctx.save();
        ctx.fillStyle = boja;
        ctx.fillRect(x, y, sirina, visina);
        ctx.restore();
      }
    }

    function showCanvas() {
      var template = document.getElementsByTagName("template")[0];
      var pomocna = template.content.cloneNode(1);
      document.body.appendChild(pomocna);
      NacrtajGraf();
    }

    var forma = document.forms["obrazac_pocetna"];
    document
      .querySelector("#forma_za_graf")
      .addEventListener("click", function () {
        forma.classList.remove("sakri_formu");
      });

    var podaci = [],
      opisi = [];
    var boje = [
      "#2F8F9D",
      "#EB5353",
      "#FFEF82",
      "#F66B0E",
      "#4E944F",
      "#827397",
    ];

    var prvi_podatak = document.forms["obrazac_pocetna"]["prvi_podatak"];
    var drugi_podatak = document.forms["obrazac_pocetna"]["drugi_podatak"];

    document
      .querySelector(".gumb_crtanje_grafa")
      .addEventListener("click", function () {
        podaci.push(prvi_podatak.value);
        opisi.push(drugi_podatak.value);
      });
  }
});
function obrisiKolacic() {
  document.cookie =
    "korisnicko_ime= ; expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  document.cookie = "lozinka= ; expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  document.cookie =
    "vrijeme_trajanja= ; expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";

  document.cookie =
    "boja_pozadine= ; expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";

  document.cookie = "nav= ;  expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";

  document.cookie = "font_stil= ;expires= Thu, 01 Jan 1970 00:00:00 GMT;path=/";

  document.cookie =
    "kosa_slova= ; expires= Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  document.cookie =
    "plavi_gumb= ; expires= Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  console.log("OBRISANO");
}

function pokazi_obrazac() {
  drugi_fset.classList.remove("sakri_fieldset");
}

function uzmiKeksic(keksicName) {
  var keksic = document.cookie;
  var prefix = keksicName + "=";
  var indeksiranje = keksic.indexOf("; " + prefix);
  if (indeksiranje == -1) {
    indeksiranje = keksic.indexOf(prefix);
    if (indeksiranje != 0) return null;
  } else {
    indeksiranje += 2;
    var kraj_keksica = document.cookie.indexOf(";", indeksiranje);
    if (kraj_keksica == -1) {
      kraj_keksica = keksic.length;
    }
  }
  return decodeURI(
    keksic.substring(indeksiranje + prefix.length, kraj_keksica)
  );
}
