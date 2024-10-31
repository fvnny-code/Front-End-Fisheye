export class LikeManager {
    static incrementLikes(media, allMedias) {
      if (!media.isLiked) {
        media.likes += 1;
        media.isLiked = true;
        LikeManager.updateTotalLikes(allMedias);
      } else {
        console.log("Vous avez déjà liké ce média !");
      }
    }
  
    static updateTotalLikes(allMedias) {
      const totalLikes = allMedias.reduce((sum, media) => sum + media.likes, 0);
      const ratingSection = document.querySelector(".photographer-rating");
      ratingSection.innerHTML = `${totalLikes} ❤`;
    }
  }