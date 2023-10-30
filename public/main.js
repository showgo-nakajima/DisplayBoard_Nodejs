document.addEventListener("DOMContentLoaded", function () {
  const searchTrigger = document.getElementById("search-trigger");
  const searchBox = document.getElementById("search-box");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // "掲示板検索"リンクをクリックしたときの表示/非表示切り替え
  searchTrigger.addEventListener("click", function (event) {
    console.log("検索BOX表示");
    event.preventDefault();
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
      searchBox.style.display = "flex";
    } else {
      searchBox.style.display = "none";
    }
  });

  // 検索ボタンをクリックしたときの処理
  searchButton.addEventListener("click", function (event) {
    console.log("検索ボタン押下");
    event.preventDefault();
    const keyword = searchInput.value;
    // ここで検索処理を実行
    // 例: 検索ワード(keyword)を使って何らかの処理を行う
    console.log(keyword);
  });

  // DOMが完全にロードされた後に実行されるコード
  var writeLink = document.getElementById("write-link");
  var writeSection = document.getElementById("write-section");

  writeLink.addEventListener("click", function (event) {
    event.preventDefault();
    // writeSection要素の表示を切り替える
    if (
      writeSection.style.display === "none" ||
      writeSection.style.display === ""
    ) {
      writeSection.style.display = "block";
    } else {
      writeSection.style.display = "none";
    }
  });
});
