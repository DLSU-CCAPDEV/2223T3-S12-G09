class Links {
    constructor(links, name, target) {
        this.links = links;
        this.name = name;
        this.target = target;
    }
}

const links = [
    new Links("index.html", "Home", "_self"),
    new Links("register.html", "Register", "_blank"),
    new Links("login.html", "Login", "_blank"),
];

/*
 <span class="hnav">
    <a href="register.html" target="_blank">
        Register
    </a>
 </span>
 <span class="hnav">Login</span>
 */

function loadLinks() {
    console.log(document.documentURI)

    const spanNav = [];
    const aNav = [];
    const spanTarget = document.querySelector("#hlinks");
    links.forEach(function(currentValue, index, array) {
        spanNav.push(document.createElement("span"));
        spanNav[index].classList = "hnav";

        aNav.push(document.createElement("a"));
        aNav[index].appendChild(document.createTextNode(currentValue.name));
        aNav[index].href = currentValue.links;
        aNav[index].target = currentValue.target;

        spanNav[index].appendChild(aNav[index]);

        spanTarget.appendChild(spanNav[index]);
    });

}
