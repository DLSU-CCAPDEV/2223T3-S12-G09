class Links {
    constructor(links, name, target) {
        this.links = links;
        this.name = name;
        this.target = target;
    }
}

const links = [
    new Links("index.html", "Home", "_self"),
    new Links("labs.html", "Labs", "_blank"),
    new Links("contacts.html", "Contacts", "_blank")
];

/*
 <span class="hnav">
    <a href="register.html" target="_blank">
        Register
    </a>
 </span>
 <span class="hnav">Login</span>
 */

const ul = document.querySelector("#nav-ul");

links.forEach(function(currentValue, index, array) {
    // <li><a href="#index">Home</a></li>
    // <li><a href="#lab">Labs</a></li>
    // <li><a href="#contact">Contact</a></li>
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = currentValue.links;
    a.innerText = currentValue.name;

    li.appendChild(a);
    ul.appendChild(li);
});
