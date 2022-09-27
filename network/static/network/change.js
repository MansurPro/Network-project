// document.addEventListener('DOMContentLoaded', function() {
    
//   const userId = document.querySelector('#userID');
//   fetch(`/profilePage/${ userId.dataset.user }`)
//   .then(response => response.json())
//   .then(data => {
//       // Print emails 
//       console.log(data);
//       loadProfile(data);
//       loadPosts(data.posts);
//       //pagination(data.posts);
//       loadFollowing(data);
//   });

//   console.log(userId.dataset.user);

//   function loadProfile(data) {
//       document.querySelector("#numFollowers").innerHTML = data.followers.length;
//       document.querySelector("#numFollowings").innerHTML = data.followings.length;
//       document.querySelector("#numPosts").innerHTML = data.posts.length;
//   }

//   const divFollowAdd = document.querySelector("#followAdd");
//   const followButtonDiv = document.createElement('div');
//   const followButton = document.createElement('button');
//   followButtonDiv.setAttribute('class', 'text-center mt-3');
//   followButton.setAttribute('class', 'btn btn-primary');
//   followButtonDiv.append(followButton);
//   divFollowAdd.append(followButtonDiv);
//   //const followButton = document.querySelector("#follow");

//   function loadFollowing(data) {
//       followButton.innerHTML = 'Follow';
//       if (userId.dataset.condition != userId.dataset.user) {
//           data.followers.forEach(follow => {
//               // console.log(follow.follower)
//               // console.log(userId.dataset.name)
//               if( userId.dataset.name === follow.follower )
//               {
//                   followButton.innerHTML = 'Unfollow';
//               }
//           });
//       } else {
//           followButton.disabled = true;
//       }
//   }

  
  
//   followButton.addEventListener('click', () => following(userId));
  
//   function following(userId) {
//       if (followButton.innerHTML == 'Follow') {
//           //followButton.innerHTML = 'Unfollow';
//           fetch(`/profilePage/follow/${ userId.dataset.user }`, {
//               method: 'POST',
//           })
//           .then(response => response)
//           .then(result => {
//               // Print result
//               console.log(result);
//           }).catch(error => console.log('Error:', error));
//           location.reload();
//       } else {
//           //followButton.innerHTML = 'Follow';
//           fetch(`/profilePage/unfollow/${ userId.dataset.user }`, {
//               method: 'POST',
//           })
//           .then(response => response)
//           .then(result => {
//               // Print result
//               console.log(result);
//           }).catch(error => console.log('Error:', error));
//           location.reload();
//       }
//       // delate console log
//       console.log('following');
//   }

  
//   function loadPosts(posts) {
//       const pagePost = document.querySelector('#postsPage');
//       posts.forEach(post1 => {
//           const postDiv1 = document.createElement('div');
//           postDiv1.setAttribute('class', 'col-md-8');
//           const postDiv2 = document.createElement('div');
//           postDiv2.setAttribute('class', 'media g-mb-30 media-comment');
//           const postDivBody = document.createElement('div');
//           postDivBody.setAttribute('class', 'media-body u-shadow-v18 g-bg-secondary g-pa-30');
//           const postDiv = document.createElement('div');
//           postDiv.setAttribute('class', 'g-mb-15');

//           const postUsername = document.createElement('h5');
//           postUsername.setAttribute('class', 'h5 g-color-gray-dark-v1 mb-0');
//           postUsername.innerHTML = post1.poster;
//           postDiv.append(postUsername);

//           const postTime = document.createElement('span');
//           postTime.setAttribute('class', 'g-color-gray-dark-v4 g-font-size-12');
//           postTime.innerHTML = post1.timestamp;
//           postDiv.append(postTime);

//           const postContent = document.createElement('p');
//           postContent.innerHTML = post1.postContent;

//           const postLikeUl = document.createElement('ul');
//           postLikeUl.setAttribute('class', 'list-inline d-sm-flex my-0');

//           const postLikeLi = document.createElement('li');
//           postLikeLi.setAttribute('class', '"list-inline-item g-mr-20');
//           const postLikeI = document.createElement('i');
//           postLikeI.setAttribute('class', 'fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3');
//           const postLikeA = document.createElement('a');
//           postLikeA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
//           postLikeA.append(postLikeI, post1.likes);
//           postLikeLi.append(postLikeA);

//           const postEditLi = document.createElement('li');
//           postEditLi.setAttribute('class', 'list-inline-item ml-auto');
//           const postEditA = document.createElement('a');
//           postEditA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
//           const postEditI = document.createElement('i');
//           postEditI.setAttribute('class', 'fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3');
//           postEditA.append(postEditI, 'Edit');
//           postEditLi.append(postEditA);

//           postLikeUl.append(postLikeLi, postEditLi);

//           postDivBody.append(postDiv, postContent, postLikeUl);
//           postDiv2.append(postDivBody);
//           postDiv1.append(postDiv2);
//           pagePost.append(postDiv1);
//       });
//   }
// });










































































/*
document.addEventListener('DOMContentLoaded',  function() {
    
    fetch("/allPosts")
    .then(response => response.json())
    .then(posts => {
        // Print emails
        console.log(posts);
        loadPosts(posts);
    });
    
    function loadPosts(posts) {
      const pagePost = document.querySelector('#postsPage');
      posts.forEach(post1 => {
          const postDiv1 = document.createElement('div');
          postDiv1.setAttribute('class', 'col-md-8');
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
          postLikeA.append(postLikeI, post1.likes);
          postLikeLi.append(postLikeA);

          const postEditLi = document.createElement('li');
          postEditLi.setAttribute('class', 'list-inline-item ml-auto');
          const postEditA = document.createElement('a');
          postEditA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
          const postEditI = document.createElement('i');
          postEditI.setAttribute('class', 'fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3');
          postEditA.append(postEditI, 'Edit');
          postEditLi.append(postEditA);

          postLikeUl.append(postLikeLi, postEditLi);

          postDivBody.append(postDiv, postContent, postLikeUl);
          postDiv2.append(postDivBody);
          postDiv1.append(postDiv2);
          pagePost.append(postDiv1);
        });
      }

      document.querySelectorAll(".userNameLink").addEventListener('click', () => userProfilePage());

      function userProfilePage() {
        console.log('Porfile');
      }
    });
*/
/*
document.addEventListener('DOMContentLoaded', function() {

    fetch("/allPosts")
    .then(response => response.json())
    .then(posts => {
        // Print emails
        console.log(posts);
        loadPosts(posts);
    });


    
});

function loadPosts(posts) {
    alert(posts[0].poster)
    const postDiv = document.createElement('div');
    postDiv.setAttribute('class', 'g-mb-15');

    const postUsername = document.createElement('h5');
    postUsername.setAttribute('class', 'h5 g-color-gray-dark-v1 mb-0');
    postUsername.innerHTML = "John Doe";
    postDiv.append(postUsername);

    const postTime = document.createElement('span');
    postTime.setAttribute('class', 'g-color-gray-dark-v4 g-font-size-12');
    postTime.innerHTML = "5 days ago";
    postDiv.append(postTime);

    const postContent = document.createElement('p');
    postContent.innerHTML = "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis."

    const postLikeUl = document.createElement('ul');
    postLikeUl.setAttribute('class', 'list-inline d-sm-flex my-0');

    const postLikeLi = document.createElement('li');
    postLikeLi.setAttribute('class', '"list-inline-item g-mr-20');
    const postLikeI = document.createElement('i');
    postLikeI.setAttribute('class', 'fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3');
    const postLikeA = document.createElement('a');
    postLikeA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
    postLikeA.append(postLikeI, '178');
    postLikeLi.append(postLikeA);

    const postEditLi = document.createElement('li');
    postEditLi.setAttribute('class', 'list-inline-item ml-auto');
    const postEditA = document.createElement('a');
    postEditA.setAttribute('class', 'u-link-v5 g-color-gray-dark-v4 g-color-primary--hover');
    const postEditI = document.createElement('i');
    postEditI.setAttribute('class', 'fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3');
    postEditA.append(postEditI, 'Edit');
    postEditLi.append(postEditA);

    postLikeUl.append(postLikeLi, postEditLi);

    document.querySelector('#divOf').append(postDiv, postContent, postLikeUl);
}


*/




/*
<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                    felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
            
                  <ul class="list-inline d-sm-flex my-0">
                    <li class="list-inline-item g-mr-20">
                      <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                        <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                        178
                      </a>
                    </li>
                    <li class="list-inline-item ml-auto">
                      <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                        <i class="fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3"></i>
                        Edit
                      </a>
                    </li>
                  </ul>




<div class="col-md-8">
    <div class="media g-mb-30 media-comment">
        <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
        <div class="g-mb-15">
            <h5 class="h5 g-color-gray-dark-v1 mb-0">John Doe</h5>
            <span class="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
        </div>

        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
        felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

        <ul class="list-inline d-sm-flex my-0">
            <li class="list-inline-item g-mr-20">
                <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                    <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                    178
                </a>
            </li>
            <li class="list-inline-item ml-auto">
                <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
                    <i class="fa fa-pencil-square-o g-pos-rel g-top-1 g-mr-3"></i>
                    Edit
                </a>
            </li>
        </ul>
        </div>
    </div>
</div>

*/