import "./bootstrap";

if (window.location.href === "http://127.0.0.1:8000/adminForm") {
    const form = document.querySelectorAll("form");
    const news = document.querySelectorAll(".news");

    let targetID;
    let title = "";
    let content = "";

    form[1].addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form[1]);
        formData.append("username", "admin");

        await fetch("http://127.0.0.1:8000/api/createNews", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    window.location.reload();
                } else {
                    alert("Error while adding news post");
                }
            });
    });
}
