function submitForm(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let message = document.getElementById("message").value;

    fetch("https://mushroom-6dto.onrender.com/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, mobile, message })
    })
    .then(res => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
    })
    .then(data => {
        alert("Order Submitted ✅");
        document.querySelector("form").reset();
    })
    .catch(err => {
        console.log("ERROR:", err);
        alert("Something went wrong ❌");
    });
}
