document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#postsPage').style.display = 'block';
  document.querySelector('#page-number').innerHTML = '';

  fetch_post(1, "allPosts");
  pagination("allPosts");
});


function pagination (url) {
  fetch(`/${ url }/pages`)
  .then(response => response.json())
  .then(result => {
      if (result.pages > 1) {
              let counter = 1;
              let previous = document.createElement('li')
              previous.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`
              previous.classList.add("page-item")

              let next = document.createElement('li')
              next.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`
              next.classList.add("page-item")

              previous.addEventListener('click', function () {
                  counter--
                  fetch_post(counter, url)
                  if (counter === 1) {
                    previous.style.display = 'none'
                    next.style.display = 'block'
                  } else {
                    next.style.display = 'block'
                  }
              })

              next.addEventListener('click', function () {
                  counter++
                  fetch_post(counter, url)
                  previous.style.display = 'block';
                  next.style.display = 'block';
                  if (counter >= result.pages) {
                    previous.style.display = 'block'
                    next.style.display = 'none'
                  }
              })
              previous.style.display = 'none'
              document.querySelector('#page-number').append(previous)
              document.querySelector('#page-number').append(next)

      }
  })
}

function fetch_post(counter, url) {
  document.querySelector('#postsPage').innerHTML = ''
  fetch(`/${url}/posts?page=${counter}`)
  .then(response => response.json())
  .then(posts => loadPosts(posts));
}

function loadPosts(posts) {
  const pagePost = document.querySelector('#postsPage');
  const username = pagePost.dataset.user;
  posts.posts.forEach(post1 => {
    const postDiv1 = document.createElement('div');
    postDiv1.setAttribute('class', 'col-md-8');
    postDiv1.setAttribute('id', `posts${post1.id}`);
    const postDiv2 = document.createElement('div');
    postDiv2.setAttribute('class', 'media g-mb-30 media-comment');
    const postDivBody = document.createElement('div');
    postDivBody.setAttribute('class', 'media-body u-shadow-v18 g-bg-secondary g-pa-30');
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'g-mb-15');

    const postUsername = document.createElement('h5');
    postUsername.setAttribute('class', 'h5 g-color-gray-dark-v1 mb-0');
    const postUsernameA = document.createElement('a');
    postUsernameA.setAttribute('class', "userNameLink");
    postUsername.innerHTML = post1.poster;
    postUsernameA.append(postUsername);
    postUsernameA.setAttribute("href", `otherProfilePage/${ post1.posterId }`);
    postDiv.append(postUsernameA);

    const postTime = document.createElement('span');
    postTime.setAttribute('class', 'g-color-gray-dark-v4 g-font-size-12');
    postTime.innerHTML = post1.timestamp;
    postDiv.append(postTime);

    const postContent = document.createElement('p');
    postContent.innerHTML = post1.postContent;

    const postLikeUl = document.createElement('ul');
    postLikeUl.setAttribute('class', 'list-inline d-sm-flex my-0');

    const postLikeLi = document.createElement('li');
    postLikeLi.setAttribute('class', '"list-inline-item g-mr-20');
    const postLikeI = document.createElement('i');
    postLikeI.setAttribute('class', 'fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3');
    const postLikeA = document.createElement('a');
    postLikeA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
    postLikeA.setAttribute('style', 'cursor: pointer;');
    postLikeA.addEventListener('click', () => likeClicked(post1.id));
    const numberLike = document.createElement('span');
    numberLike.setAttribute('id', `like${post1.id}`);
    numberLike.innerHTML = post1.likes
    postLikeA.append(postLikeI, numberLike);
    postLikeLi.append(postLikeA);

    postLikeUl.append(postLikeLi);

    if (username === post1.poster) {
      const postEditLi = document.createElement('li');
      postEditLi.setAttribute('class', 'list-inline-item ml-auto');
      const postEditA = document.createElement('a');
      postEditA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
      postEditA.setAttribute('id', `edit${post1.id}`);
      postEditA.setAttribute('style', 'cursor: pointer;');
      const postEditI = document.createElement('i');
      postEditI.setAttribute('class', 'fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3');
      postEditA.append(postEditI, 'Edit');
      postEditLi.append(postEditA);
      postLikeUl.append(postEditLi);
    }


    postDivBody.append(postDiv, postContent, postLikeUl);
    postDiv2.append(postDivBody);
    postDiv1.append(postDiv2);
    pagePost.append(postDiv1);
  });

  posts.userPosts.forEach(post => {
    const editPost = document.querySelector(`#posts${post.id}`);
    const editBtn = document.querySelector(`#edit${post.id}`);
    editBtn.addEventListener('click', () => postEdition(editPost, post));
  });
}

function likeClicked(post_id) {
  const likeBtn = document.querySelector(`#like${post_id}`);
  fetch(`allPosts/like/${ post_id }`, {
      method: 'POST',
  })
  .then(response => response)
  .then(result => {
      if (result.status === 202) {
        const prev = likeBtn.innerHTML;
        likeBtn.innerHTML = parseInt(prev) - 1;
      } else {
        const prev = likeBtn.innerHTML;
        likeBtn.innerHTML = parseInt(prev) + 1;
      }
  }).catch(error => console.log('Error:', error));
}

function postEdition(postDiv, post) {
  postDiv.innerHTML = `
      <div class="post-editor" id="divEdited${post.id}">
        <textarea name="post-field" id="edited${post.id}" class="post-field" style="padding-top:20px;">${post.postContent}</textarea>
        <div class="d-flex">
          <button type="submit" class="btn btn-success px-4 py-1" onclick="changePost(${post.id})">Change</button>
        </div>
      </div>
  `;
}

function changePost(post_id) {
  const changedContent = document.querySelector(`#edited${post_id}`).value;
  fetch(`/allPosts/edit/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        postContent: changedContent
    })
  }).then(response => response.status)
  .then(status => {
    if (status === 204) {
      fetch(`/allPosts/edit/${post_id}`)
      .then(response => response.json())
      .then(data => {
        loadChangedPost(data);
      }).catch(error => console.log(error));
    }
  });
}

function loadChangedPost(data) {
  const editTextarea = document.querySelector(`#divEdited${data.id}`);
  editTextarea.remove();
  const pagePost = document.querySelector('#postsPage');
  const username = pagePost.dataset.user;
  const postDiv1 = document.querySelector(`#posts${data.id}`);
  const postDiv2 = document.createElement('div');
  postDiv2.setAttribute('class', 'media g-mb-30 media-comment');
  const postDivBody = document.createElement('div');
  postDivBody.setAttribute('class', 'media-body u-shadow-v18 g-bg-secondary g-pa-30');
  const postDiv = document.createElement('div');
  postDiv.setAttribute('class', 'g-mb-15');

  const postUsername = document.createElement('h5');
  postUsername.setAttribute('class', 'h5 g-color-gray-dark-v1 mb-0');
  const postUsernameA = document.createElement('a');
  postUsernameA.setAttribute('class', "userNameLink");
  postUsername.innerHTML = data.poster;
  postUsernameA.append(postUsername);
  postUsernameA.setAttribute("href", `otherProfilePage/${ data.posterId }`);
  postDiv.append(postUsernameA);

  const postTime = document.createElement('span');
  postTime.setAttribute('class', 'g-color-gray-dark-v4 g-font-size-12');
  postTime.innerHTML = data.timestamp;
  postDiv.append(postTime);

  const postContent = document.createElement('p');
  postContent.innerHTML = data.postContent;

  const postLikeUl = document.createElement('ul');
  postLikeUl.setAttribute('class', 'list-inline d-sm-flex my-0');

  const postLikeLi = document.createElement('li');
  postLikeLi.setAttribute('class', '"list-inline-item g-mr-20');
  const postLikeI = document.createElement('i');
  postLikeI.setAttribute('class', 'fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3');
  const postLikeA = document.createElement('a');
  postLikeA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
  postLikeA.addEventListener('click', () => likeClicked(data.id));
  const numberLike = document.createElement('span');
  numberLike.setAttribute('id', `like${data.id}`);
  numberLike.innerHTML = data.likes
  postLikeA.append(postLikeI, numberLike);
  postLikeLi.append(postLikeA);

  postLikeUl.append(postLikeLi)

  if (username === data.poster) {
    const postEditLi = document.createElement('li');
    postEditLi.setAttribute('class', 'list-inline-item ml-auto');
    const postEditA = document.createElement('a');
    postEditA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
    postEditA.setAttribute('id', `edit${data.id}`);
    postEditA.setAttribute('style', 'cursor: pointer;');
    const postEditI = document.createElement('i');
    postEditI.setAttribute('class', 'fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3');
    postEditA.append(postEditI, 'Edit');
    postEditLi.append(postEditA);
    postLikeUl.append(postEditLi);
  }


  postDivBody.append(postDiv, postContent, postLikeUl);
  postDiv2.append(postDivBody);
  postDiv1.append(postDiv2);

  const editBtn = document.querySelector(`#edit${data.id}`);
  editBtn.addEventListener('click', () => postEdition(postDiv1, data));
}
