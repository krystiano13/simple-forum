import "./bootstrap";

if (window.location.href === "http://127.0.0.1:8000/adminForm") {
    const form = document.querySelectorAll("form");
    const news = document.querySelectorAll(".news");
    const modeButton = document.querySelector("#mode");
    const deleteButtons = document.querySelectorAll(".delete");

    let mode = "add";

    let targetID = null;

    deleteButtons.forEach((item) => {
        item.addEventListener("click", async (e) => {
            const id = e.target.id;
            const formData = new FormData(form[0]);
            formData.append('username', 'admin');

            const res = await fetch(`http://127.0.0.1:8000/api/deleteNews/${id}`,
                { method: "POST", body: formData })
              
            const data = await res.json();

            if (data.status) {
                window.location.reload();
            }

            else {
                alert('Error while deleting')
            }
        });
    });

    modeButton.addEventListener("click", () => {
        if (mode === "add") {
            if (targetID) mode = "edit";
            else alert("Select news to edit first");
        } else {
            mode = "add";
        }

        modeButton.innerHTML = `mode: ${mode}`;
    });

    news.forEach((item) => {
        item.addEventListener("click", async (e) => {
            targetID = e.target.id;

            const titleInput = form[1].querySelector("#title");
            const contentInput = form[1].querySelector("textarea");

            await fetch(`http://127.0.0.1:8000/api/getSingleNews/${targetID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(titleInput);
                    titleInput.value = data.item.title;
                    contentInput.value = data.item.content;
                });

            mode = "edit";
            modeButton.innerHTML = `mode: ${mode}`;
        });
    });

    form[1].addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form[1]);
        formData.append("username", "admin");

        if (mode === "add") {
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
        } else {
            await fetch(`http://127.0.0.1:8000/api/editNews/${targetID}`, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        window.location.reload();
                    } else {
                        alert("Editing error");
                    }
                });
        }
    });
}
