///////////   👇  HELPER TO GET DOM ELEMENT   \\\\\\\\\\\\\\
const customSelector = () => {
    const selector = document.querySelector.bind(document); // 👈 Close DOM API !
    return id => selector(id);
}
const del = customSelector();

///////////   👇  MODIFY TO VALID SLUG    \\\\\\\\\\\\\\
function validateSlugUrl(e) {
    const value = e.target.value;
    const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')  // 👈 Replace invalid characters with hyphen
        .replace(/-{2,}/g, '-') // 👈 Replace consecutive hyphens with a single hyphen
        .replace(/^-+|-+$/g, '-'); // 👈 Remove leading and trailing hyphens
    document.querySelector("#slug").value = slug;
}

// ///////////   👇  HELPER TO MAKE data:image ON UPLOAD IMAGE   \\\\\\\\\\\\\\
// function getBase64(file) {
//     return new Promise(resolve => {
//         let baseURL = "";
//         let reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             baseURL = reader.result;
//             resolve(baseURL);
//         };
//     });
// }
//
// ///////////   👇  SHOW  POST  IMAGE  ON UPLOAD   \\\\\\\\\\\\\\
// function uploadImage(e) {
//     const file = e.target.files[0];
//     if (file.type.startsWith('image/')) {
//         getBase64(file)
//             .then(res => {
//                 del("#uploadedPostImage").src = res;
//             })
//     }
// }

///////////   👇  DELETE COMMENT BY ID   \\\\\\\\\\\\\\
function deleteComment(e) {
    e.target.disabled = true;
    const id = e.target.dataset?.id;
    const comment = del("#postComment" + id);
    post(
        `${url2290onlineForm}/News/EditNewsCommand`,
        {
            "id": id,
            "isActive": false,
            "isDeleted": true
        },
        TOKEN_AUTH_FOR_API
    ).then(res => {
        if (res.success) {
            comment.parentNode.removeChild(comment);
        }
    })
}

///////////   👇  CHANGE COMMENTS STATUS   \\\\\\\\\\\\\\
function changeCommentStatus(e) {
    post(
        `${url2290onlineForm}/News/EditNewsCommand`,
        {
            "id": e.target.dataset?.id,
            "isActive": e.target.value === "1",
            "isDeleted": false
        },
        TOKEN_AUTH_FOR_API
    );
}

///////////   👇  SAVE NEW ADDED POST   \\\\\\\\\\\\\\
function addNewPost(event, id) {
    let isValid = true;
    const inputs = del("#postInputs").querySelectorAll("input");
    inputs.forEach(input => { // 👈  Fill inputs
        if (input.type !== "radio" && !input.value) {
            input.classList.add('error');
            isValid = false;
        }else {
            input.classList.remove('error');
        }
    });
    if(isValid) {
        event.target.style.disabled = true;
        post(
            `${url2290onlineForm}/News/${id ? "EditNews": "AddNews"}`,
            {
                ...(id && {id: +id}),
                title: del("#title").value,
                slug: del("#slug").value,
                NewsTypeId: +del("#type").value,
                isActive: del('input[name="status"]:checked').value === "1",
                imageBase64: del("#uploadedPostImage").src,
                imageOrgName: del("#uploadPostImage").files[0]?.name || del("#uploadPostImage").dataset?.name || "image.png",
                body: CKEDITOR.instances.editor1.getData()
            },
            TOKEN_AUTH_FOR_API
        ).then(res => {
            event.target.style.disabled = false;
            if(res.success){
                window.location.href = `${domain}/2290onlineform/posts`
            }
        })
    }else {
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: "smooth",
        })
    }
}

///////////   👇  FILL POST DATA ON EDIT   \\\\\\\\\\\\\\
function fillPostData(data) {
    const inputs = del("#postInputs").querySelectorAll("input")
    inputs.forEach(input => { // 👈  Fill inputs
        if (input.type !== "radio") {
            input.value = data[input.id];
        }
    });
    del("#uploadedPostImage").src = `data:image/png;base64,${data.imageBase64}`;
    del("#type").value = data.NewsType || "blogs";
    del("#uploadPostImage")["data-name"] = data.imageOrgName;
    if (!data.isActive) {
        del("#postInactive").click();
    }
    del("#type").value = data.newsType.id;
    del("#postDescription").innerHTML = `
        <div class="rounded">
            <div class="mb-1 d-flex page-title">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.66667 28C5.93333 28 5.30533 27.7391 4.78267 27.2173C4.26089 26.6947 4 26.0667 4 25.3333V6.66667C4 5.93333 4.26089 5.30533 4.78267 4.78267C5.30533 4.26089 5.93333 4 6.66667 4H25.3333C26.0667 4 26.6947 4.26089 27.2173 4.78267C27.7391 5.30533 28 5.93333 28 6.66667V25.3333C28 26.0667 27.7391 26.6947 27.2173 27.2173C26.6947 27.7391 26.0667 28 25.3333 28H6.66667ZM10.6667 22.6667C11.0444 22.6667 11.3613 22.5387 11.6173 22.2827C11.8724 22.0276 12 21.7111 12 21.3333C12 20.9556 11.8724 20.6387 11.6173 20.3827C11.3613 20.1276 11.0444 20 10.6667 20C10.2889 20 9.972 20.1276 9.716 20.3827C9.46089 20.6387 9.33333 20.9556 9.33333 21.3333C9.33333 21.7111 9.46089 22.0276 9.716 22.2827C9.972 22.5387 10.2889 22.6667 10.6667 22.6667ZM10.6667 17.3333C11.0444 17.3333 11.3613 17.2053 11.6173 16.9493C11.8724 16.6942 12 16.3778 12 16C12 15.6222 11.8724 15.3053 11.6173 15.0493C11.3613 14.7942 11.0444 14.6667 10.6667 14.6667C10.2889 14.6667 9.972 14.7942 9.716 15.0493C9.46089 15.3053 9.33333 15.6222 9.33333 16C9.33333 16.3778 9.46089 16.6942 9.716 16.9493C9.972 17.2053 10.2889 17.3333 10.6667 17.3333ZM10.6667 12C11.0444 12 11.3613 11.872 11.6173 11.616C11.8724 11.3609 12 11.0444 12 10.6667C12 10.2889 11.8724 9.972 11.6173 9.716C11.3613 9.46089 11.0444 9.33333 10.6667 9.33333C10.2889 9.33333 9.972 9.46089 9.716 9.716C9.46089 9.972 9.33333 10.2889 9.33333 10.6667C9.33333 11.0444 9.46089 11.3609 9.716 11.616C9.972 11.872 10.2889 12 10.6667 12ZM16 22.6667H21.3333C21.7111 22.6667 22.0276 22.5387 22.2827 22.2827C22.5387 22.0276 22.6667 21.7111 22.6667 21.3333C22.6667 20.9556 22.5387 20.6387 22.2827 20.3827C22.0276 20.1276 21.7111 20 21.3333 20H16C15.6222 20 15.3058 20.1276 15.0507 20.3827C14.7947 20.6387 14.6667 20.9556 14.6667 21.3333C14.6667 21.7111 14.7947 22.0276 15.0507 22.2827C15.3058 22.5387 15.6222 22.6667 16 22.6667ZM16 17.3333H21.3333C21.7111 17.3333 22.0276 17.2053 22.2827 16.9493C22.5387 16.6942 22.6667 16.3778 22.6667 16C22.6667 15.6222 22.5387 15.3053 22.2827 15.0493C22.0276 14.7942 21.7111 14.6667 21.3333 14.6667H16C15.6222 14.6667 15.3058 14.7942 15.0507 15.0493C14.7947 15.3053 14.6667 15.6222 14.6667 16C14.6667 16.3778 14.7947 16.6942 15.0507 16.9493C15.3058 17.2053 15.6222 17.3333 16 17.3333ZM16 12H21.3333C21.7111 12 22.0276 11.872 22.2827 11.616C22.5387 11.3609 22.6667 11.0444 22.6667 10.6667C22.6667 10.2889 22.5387 9.972 22.2827 9.716C22.0276 9.46089 21.7111 9.33333 21.3333 9.33333H16C15.6222 9.33333 15.3058 9.46089 15.0507 9.716C14.7947 9.972 14.6667 10.2889 14.6667 10.6667C14.6667 11.0444 14.7947 11.3609 15.0507 11.616C15.3058 11.872 15.6222 12 16 12Z"
                          fill="#F59720"/>
                </svg>
                <h2 class='title ' id='emailTemplateTitle'>Post ID ${data.id} Details</h2>
            </div>
            <table class="w-100">
                <tbody>
                <tr>
                    <td>
                        <span class="fw-bold">Title : </span>${data.title}
                    </td>
                    <td>
                        <span class="fw-bold">Comments : </span>${data.commentCount}
                    </td>
                    <td>
                        <span class="fw-bold">Updated Date : </span> ${checkDataFormatInOrderDetails(data.updateTime)}
                    </td>
                    <td>
                        <span class="fw-bold">Status : </span>Active
                    </td>
                    <td rowspan="2">
                        <img
                            class="object-cover"
                            src=data:image/png;base64,${data.imageBase64}
                            alt="image"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="fw-bold"> Category : </span>${data.newsType?.title}
                    </td>
                    <td>
                        <span class="fw-bold">Likes : </span>${data.likeCount}
                    </td>
                    <td>
                        <span class="fw-bold">Created Date : </span> ${checkDataFormatInOrderDetails(data.registerTime)}
                    </td>
                    <td>
                        <span class="fw-bold">Post Picture </span>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9H20V7H0V9Z" fill="#00B74A"/>
                        </svg>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    `;

    if (data.listNewsCommentDTO?.length) {
        const commentsRoot = document.querySelector("#postCommentsRoot");

        // 👇 Add title to comments section
        commentsRoot.innerHTML = `  
            <div class="page-title postCommentsTitle p-3"> 
                <div class="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_431_8371)">
                            <path d="M3.69231 0H20.3077C22.3385 0 24 1.35 24 3V13.5C24 15.15 22.3385 16.5 20.3077 16.5H16.6154L7.38462 24V16.5H3.69231C1.66154 16.5 0 15.15 0 13.5V3C0 1.35 1.66154 0 3.69231 0Z" fill="#F59720"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_431_8371">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                   </svg>
               </div>
               <div class='title ' id='emailTemplateTitle'>Post Comments</div>
           </div>
        `;

        // 👇 Render all comments with loop
        data.listNewsCommentDTO.forEach(el => {
            commentsRoot.innerHTML += `
                <div class="postCommentItem p-3 d-flex border-bottom bg-white" id="postComment${el.id}">
                    <div class="w-75">
                        <div class="d-flex gap-2">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M17.114 2.83331C9.23142 2.83331 2.83398 9.23075 2.83398 17.1133C2.83398 24.9959 9.23142 31.3933 17.114 31.3933C24.9965 31.3933 31.394 24.9959 31.394 17.1133C31.394 9.23075 24.9965 2.83331 17.114 2.83331ZM17.114 8.54531C19.87 8.54531 22.112 10.7873 22.112 13.5433C22.112 16.2994 19.87 18.5413 17.114 18.5413C14.3579 18.5413 12.116 16.2994 12.116 13.5433C12.116 10.7873 14.3579 8.54531 17.114 8.54531ZM17.114 28.5373C14.2151 28.5373 10.7879 27.3664 8.34606 24.4247C10.8474 22.4622 13.9347 21.3956 17.114 21.3956C20.2933 21.3956 23.3806 22.4622 25.8819 24.4247C23.44 27.3664 20.0128 28.5373 17.114 28.5373Z" fill="#F59720"/>
                            </svg>
                            <div>
                                <p class="mb-0 fw-bold">${el.name}</p>
                                <span class="commentDate fs-14">${el.registerTime}</span>
                            </div>
                        </div>
                        <p class="commentBody">${el.body}</p>
                    </div>
                    <div class="w-25">
                        <div class="postStatus mb-5 d-flex flex-column">
                            <span class="mb-2 fw-bold">Post Status</span>
                            <div class="d-flex gap-3 align-items-center">
                                <label class="postStatusActive d-flex flex-row gap-2 pointer">
                                    <input 
                                        onchange="changeCommentStatus(event)"
                                        type="radio"
                                        ${el.isActive ? "checked" : ""}
                                        value="1" 
                                        data-id="${el.id}"
                                        name="status-${el.id}"
                                    />
                                    <span>Active</span>
                                </label>
                                <label class="postStatusInactive d-flex flex-row gap-2 pointer">
                                    <input 
                                        onchange="changeCommentStatus(event)"
                                        type="radio" 
                                        ${!el.isActive ? "checked" : ""}
                                        value="0" 
                                        data-id="${el.id}"
                                        name="status-${el.id}"
                                    />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>
                        <button
                            class="w-100 btn btn-danger"
                            data-id="${el.id}"
                            onclick="deleteComment(event)"
                        > 
                            Delete Comment
                        </button>     
                    </div>
                </div>
            `
        })
    }

    const addBtn = del("#addBtn");
    addBtn.innerHTML = "Save Changes";
    addBtn.parentNode.innerHTML += `
        <a class='btn btn-primary' href="${domain}/2290onlineform/posts">
            Cancel
        </a>
    `
}


function handleViewPost (id) {
    const postModal = document.getElementById('postModal');
    postModal.style.display = 'block';
    const blockLoader = postModal.querySelector('#blockLoader');
    blockLoader.style.display = 'flex';
    get(`${url2290onlineForm}/News/GetNewsById/${id}`, null, TOKEN_AUTH_FOR_API)
        .then(data => {
            if(data.success) {

                postModal.querySelector('#content').innerHTML = `
            <div class="details-content">
                <div class='d-flex flex-column gap-4'>
                    <div class="row">
                        <div class="table-top-part mb-2">
                            <div class="page-title m-0">
                                <div class="icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#F59720"/>
                                        <path d="M22.7063 11.5027C21.8438 9.29011 20.3464 7.37663 18.3992 5.99879C16.452 4.62095 14.1404 3.83914 11.75 3.75C9.35964 3.83914 7.04802 4.62095 5.10083 5.99879C3.15363 7.37663 1.65623 9.29011 0.793689 11.5027C0.735437 11.6625 0.735437 11.8375 0.793689 11.9973C1.65623 14.2099 3.15363 16.1234 5.10083 17.5012C7.04802 18.8791 9.35964 19.6609 11.75 19.75C14.1404 19.6609 16.452 18.8791 18.3992 17.5012C20.3464 16.1234 21.8438 14.2099 22.7063 11.9973C22.7646 11.8375 22.7646 11.6625 22.7063 11.5027ZM11.75 16.4773C10.8072 16.4773 9.8856 16.2 9.10171 15.6806C8.31781 15.1611 7.70684 14.4228 7.34605 13.559C6.98526 12.6953 6.89086 11.7448 7.07479 10.8278C7.25872 9.91075 7.71271 9.06843 8.37936 8.40731C9.04601 7.74619 9.89537 7.29596 10.82 7.11356C11.7447 6.93116 12.7032 7.02477 13.5742 7.38257C14.4452 7.74037 15.1897 8.34627 15.7135 9.12367C16.2372 9.90106 16.5168 10.815 16.5168 11.75C16.5149 13.0032 16.012 14.2044 15.1185 15.0906C14.225 15.9767 13.0136 16.4753 11.75 16.4773Z" fill="#F59720"/>
                                    </svg>
                                </div>
                                <div class='title ' id='emailTemplateTitle'>View Post</div>
                            </div>
                            <a href='${domain}/2290onlineform/posts/post?id=${id}'><button class='actionBtn edit-btn'>Edit</button></a>
                            <div class='note-block'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="min-width: 24px;" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 9H11V7H13M13 17H11V11H13M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7363 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="#F59720"/>
                                </svg>
                                <p class='m-0'>“ Welcome to the ‘ View Post ‘ popup. Here you can always view your blog or news. You can also edit 
                                your post title, post URL slug, post category, post status, post picture, post comments and post additional fields “</p>
                             </div>
                            <button type="button" class="closeBtnDetails" onclick="hideModal('postModal')">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.3332 2.54666L17.4532 0.666664L9.99984 8.12L2.5465 0.666664L0.666504 2.54666L8.11984 10L0.666504 17.4533L2.5465 19.3333L9.99984 11.88L17.4532 19.3333L19.3332 17.4533L11.8798 10L19.3332 2.54666Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div id="postDescription">
                    
                    <div class="rounded">
            <div class="mb-1 d-flex page-title">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.66667 28C5.93333 28 5.30533 27.7391 4.78267 27.2173C4.26089 26.6947 4 26.0667 4 25.3333V6.66667C4 5.93333 4.26089 5.30533 4.78267 4.78267C5.30533 4.26089 5.93333 4 6.66667 4H25.3333C26.0667 4 26.6947 4.26089 27.2173 4.78267C27.7391 5.30533 28 5.93333 28 6.66667V25.3333C28 26.0667 27.7391 26.6947 27.2173 27.2173C26.6947 27.7391 26.0667 28 25.3333 28H6.66667ZM10.6667 22.6667C11.0444 22.6667 11.3613 22.5387 11.6173 22.2827C11.8724 22.0276 12 21.7111 12 21.3333C12 20.9556 11.8724 20.6387 11.6173 20.3827C11.3613 20.1276 11.0444 20 10.6667 20C10.2889 20 9.972 20.1276 9.716 20.3827C9.46089 20.6387 9.33333 20.9556 9.33333 21.3333C9.33333 21.7111 9.46089 22.0276 9.716 22.2827C9.972 22.5387 10.2889 22.6667 10.6667 22.6667ZM10.6667 17.3333C11.0444 17.3333 11.3613 17.2053 11.6173 16.9493C11.8724 16.6942 12 16.3778 12 16C12 15.6222 11.8724 15.3053 11.6173 15.0493C11.3613 14.7942 11.0444 14.6667 10.6667 14.6667C10.2889 14.6667 9.972 14.7942 9.716 15.0493C9.46089 15.3053 9.33333 15.6222 9.33333 16C9.33333 16.3778 9.46089 16.6942 9.716 16.9493C9.972 17.2053 10.2889 17.3333 10.6667 17.3333ZM10.6667 12C11.0444 12 11.3613 11.872 11.6173 11.616C11.8724 11.3609 12 11.0444 12 10.6667C12 10.2889 11.8724 9.972 11.6173 9.716C11.3613 9.46089 11.0444 9.33333 10.6667 9.33333C10.2889 9.33333 9.972 9.46089 9.716 9.716C9.46089 9.972 9.33333 10.2889 9.33333 10.6667C9.33333 11.0444 9.46089 11.3609 9.716 11.616C9.972 11.872 10.2889 12 10.6667 12ZM16 22.6667H21.3333C21.7111 22.6667 22.0276 22.5387 22.2827 22.2827C22.5387 22.0276 22.6667 21.7111 22.6667 21.3333C22.6667 20.9556 22.5387 20.6387 22.2827 20.3827C22.0276 20.1276 21.7111 20 21.3333 20H16C15.6222 20 15.3058 20.1276 15.0507 20.3827C14.7947 20.6387 14.6667 20.9556 14.6667 21.3333C14.6667 21.7111 14.7947 22.0276 15.0507 22.2827C15.3058 22.5387 15.6222 22.6667 16 22.6667ZM16 17.3333H21.3333C21.7111 17.3333 22.0276 17.2053 22.2827 16.9493C22.5387 16.6942 22.6667 16.3778 22.6667 16C22.6667 15.6222 22.5387 15.3053 22.2827 15.0493C22.0276 14.7942 21.7111 14.6667 21.3333 14.6667H16C15.6222 14.6667 15.3058 14.7942 15.0507 15.0493C14.7947 15.3053 14.6667 15.6222 14.6667 16C14.6667 16.3778 14.7947 16.6942 15.0507 16.9493C15.3058 17.2053 15.6222 17.3333 16 17.3333ZM16 12H21.3333C21.7111 12 22.0276 11.872 22.2827 11.616C22.5387 11.3609 22.6667 11.0444 22.6667 10.6667C22.6667 10.2889 22.5387 9.972 22.2827 9.716C22.0276 9.46089 21.7111 9.33333 21.3333 9.33333H16C15.6222 9.33333 15.3058 9.46089 15.0507 9.716C14.7947 9.972 14.6667 10.2889 14.6667 10.6667C14.6667 11.0444 14.7947 11.3609 15.0507 11.616C15.3058 11.872 15.6222 12 16 12Z"
                          fill="#F59720"/>
                </svg>
                <h2 class='title ' id='emailTemplateTitle'>Post ID ${data.id} Details</h2>
            </div>
            <table class="w-100">
                <tbody>
                <tr>
                    <td>
                        <span class="fw-bold">Title : </span>${data.title}
                    </td>
                    <td>
                        <span class="fw-bold">Comments : </span>${data.commentCount}
                    </td>
                    <td>
                        <span class="fw-bold">Updated Date : </span> ${checkDataFormatInOrderDetails(data.updateTime)}
                    </td>
                    <td>
                        <span class="fw-bold">Status : </span>Active
                    </td>
                    <td rowspan="2">
                        <img
                            class="object-cover"
                            src=data:image/png;base64,${data.imageBase64}
                            alt="image"
                            style="width: 60px;"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="fw-bold"> Category : </span>${data.newsType?.title}
                    </td>
                    <td>
                        <span class="fw-bold">Likes : </span>${data.likeCount}
                    </td>
                    <td>
                        <span class="fw-bold">Created Date : </span> ${checkDataFormatInOrderDetails(data.registerTime)}
                    </td>
                    <td>
                        <span class="fw-bold">Post Picture </span>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9H20V7H0V9Z" fill="#00B74A"/>
                        </svg>
                    </td>
                </tr>
                </tbody>
            </table>
         </div>
        </div>
                <div class="post-details">
                    <div class="email-template row g-4 mb-3" id='postInputs'>
                        <div class="w-25 custom-input col-sm-6">
                            <label for='title' class="fw-bold">Post Title</label>
                            <input id='title' class="disabled" disabled type='text' value='${data.title}'/>
                        </div>
                        <div class="w-25 custom-input col-sm-6 user-select-none">
                            <label for='slug' class="fw-bold">URL Slug</label>
                            <input id='slug' type='text' class="disabled" disabled value='${data.slug}'/>
                        </div>
                        <div class="postType w-25 custom-input col-sm-6">
                            <label for='type' class="fw-bold">Post Category</label>
                             <select id="type" class="form-control form-select" class="disabled" disabled >
                                <option selected>${data.newsType.title}</option>
                            </select>
                        </div>
                        <div class="postStatus w-25 d-flex flex-column">
                            <span class="mb-2 fw-bold">Post Status</span>
                            <span>${data.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                    <div class="d-flex row flex-nowrap m-0">
                        <div class="w-75 content-block">
                        
                            <div class="box-head">
                            <div class="d-flex page-title">
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.59961 1.2V22.8H20.3996V1.2H3.59961ZM14.3996 16.8H7.19961V15.6H14.3996V16.8ZM16.7996 13.2H7.19961V12H16.7996V13.2ZM16.7996 9.6H7.19961V8.4H16.7996V9.6ZM16.7996 6H7.19961V4.8H16.7996V6Z" fill="#F59720"/>
                                </svg>
                                <h2 class="title">Post Content</h2>
                            </div>
                            </div>
                            <div class="postContent mt-4">
                                ${data.body}
                            </div>
                        </div>
                        
                            
                        <div class="w-25">
                            <label class="w-100 pointer">
                                <img
                                        id="uploadedPostImage"
                                        class="w-100 rounded-5"
                                        src='data:image/png;base64,${data.imageBase64}'
                                        alt="image"
                                        style="object-fit: contain;"
                                />
                            </label>
                        </div>
                    </div>

                    <div id="postCommentsRoot" class="mt-3"><div class="content-block"></div> </div>
                </div>
             
                </div>
    `
            }
            const commentsRoot = document.querySelector("#postCommentsRoot");
            if(data.listNewsCommentDTO?.length) {
                const commentContentBlock = commentsRoot.querySelector('.content-block');
                commentContentBlock.innerHTML = `  
                            <div class="box-head">
                            <div class="d-flex page-title">
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_431_8371)">
                                        <path d="M3.69231 0H20.3077C22.3385 0 24 1.35 24 3V13.5C24 15.15 22.3385 16.5 20.3077 16.5H16.6154L7.38462 24V16.5H3.69231C1.66154 16.5 0 15.15 0 13.5V3C0 1.35 1.66154 0 3.69231 0Z" fill="#F59720"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_431_8371">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                               </svg>
                                <h2 class="title">Post Comments</h2>
                            </div>
                            </div>
        `;

                // 👇 Render all comments with loop
                data.listNewsCommentDTO.forEach(el => {
                    commentContentBlock.innerHTML += `
                <div class="postCommentItem p-3 d-flex border-bottom bg-white" id="postComment${el.id}">
                    <div class="w-75">
                        <div class="d-flex gap-2 align-items-center">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M17.114 2.83331C9.23142 2.83331 2.83398 9.23075 2.83398 17.1133C2.83398 24.9959 9.23142 31.3933 17.114 31.3933C24.9965 31.3933 31.394 24.9959 31.394 17.1133C31.394 9.23075 24.9965 2.83331 17.114 2.83331ZM17.114 8.54531C19.87 8.54531 22.112 10.7873 22.112 13.5433C22.112 16.2994 19.87 18.5413 17.114 18.5413C14.3579 18.5413 12.116 16.2994 12.116 13.5433C12.116 10.7873 14.3579 8.54531 17.114 8.54531ZM17.114 28.5373C14.2151 28.5373 10.7879 27.3664 8.34606 24.4247C10.8474 22.4622 13.9347 21.3956 17.114 21.3956C20.2933 21.3956 23.3806 22.4622 25.8819 24.4247C23.44 27.3664 20.0128 28.5373 17.114 28.5373Z" fill="#F59720"/>
                            </svg>
                            <div>
                                <p class="mb-0 fw-bold">${el.name}</p>
                                <span class="commentDate fs-14">${el.registerTime}</span>
                            </div>
                        </div>
                        <p class="commentBody">${el.body}</p>
                    </div>
                </div>
            `
                })
            }
        })
        .finally(() => {
            blockLoader.style.display = 'none';
        })
};

function openRemovePostModal (target, id) {
    const removeModalBlock = document.getElementById('removePostModal');
    removeModalBlock.style.display = 'block';
    const removingLine = target.closest('tr').dataset.position;
    removeModalBlock.querySelector('#content').innerHTML = `
    <div class="details-content">
        <div class="row">
               <div class="form-group d-flex justify-content-between align-items-center">
                   <div class="page-title">
                       <div class="icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.59961 1.2V22.8H20.3996V1.2H3.59961ZM14.3996 16.8H7.19961V15.6H14.3996V16.8ZM16.7996 13.2H7.19961V12H16.7996V13.2ZM16.7996 9.6H7.19961V8.4H16.7996V9.6ZM16.7996 6H7.19961V4.8H16.7996V6Z" fill="#F59720"/>
                            </svg>

                       </div>
                       <div id="headerDetails" class="title">Remove Post</div>
                   </div>
                   <button type="button" class="closeBtnDetails" onclick="hideModal('removePostModal')" data-bs-dismiss="modal" aria-label="Close">
                       <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="white"/>
                          </svg>
                   </button>
               </div>
           </div>
           <div><p>Are you sure you want to remove this post?</p></div>
           <div class="d-flex justify-content-between">
            <button type="button" class='actionBtn details' onclick="hideModal('removePostModal')">Cancel</button>
           <button class='actionBtn incomplete' onclick="handleRemovePost(${id}, ${removingLine})">Remove</button>
            </div>
       </div>
    `
};

function handleRemovePost (id, removingLine) {
    get(`${url2290onlineForm}/News/DeleteNews?newsId=${id}`, null, TOKEN_AUTH_FOR_API)
        .then(res => {
            if(res.success) {
                const postTable = document.getElementById('postsTable');
                const allLines = postTable.querySelectorAll('tr[data-position]');
                allLines.forEach((tr, idx) => {
                    if(tr.dataset.position == removingLine) {
                        tr.remove();
                    }else if(idx+1 > removingLine) {
                        tr.querySelector('#position').innerText = Number(tr.querySelector('#position').innerText) - 1;
                        tr.dataset.position = idx;
                    }
                })
                document.getElementById('pageSizeEnd').innerText = allLines.length - 1;
                hideModal('removePostModal');
            }
        })


}


///////////   👇  HELPER TO MAKE data:image ON UPLOAD IMAGE   \\\\\\\\\\\\\\
function getBase64(file) {
    return new Promise(resolve => {
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
}

///////////   👇  SHOW  POST  IMAGE  ON UPLOAD   \\\\\\\\\\\\\\
function uploadImage(e, id) {
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
        getBase64(file)
            .then(res => {
                document.getElementById(`${id}`).src = res;
            })
    }
}