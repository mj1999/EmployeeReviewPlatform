const addReview = function (addReviewForm) {
  addReviewForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/review/create",
      data: addReviewForm.serialize(),
      success: function (data) {
        let newReview = newReviewDom(data.data.newReview);
        let pendingReviewDisplay = $("#pending-reviews-display");
        newReview.insertAfter($(" h2", pendingReviewDisplay));
        notification("success", "New review created successfully");
      },
      error: function (jqXHR) {
        notification("error", jqXHR.responseJSON.message);
      },
    });
  });
};

const newReviewDom = function (review) {
  return $(`
        <div id="${review._id}" class="review-card pending">
            <div class="reviewee info">
            <div class="header">Reviewee:-</div>
            <div class="reviewee-eid">
                <div class="table-header">EID</div>
                <div>${review.reviewee.eid}</div>
            </div>
            <div class="reviewee-name">
                <div class="table-header">NAME:</div>
                <div>${review.reviewee.name}</div>
            </div>
            </div>
            <div class="reviewer info">
            <div class="header">Reviewer:-</div>
            <div class="reviewee-eid">
                <div class="table-header">EID</div>
                <div>${review.reviewer.eid}</div>
            </div>
            <div class="reviewee-name">
                <div class="table-header">NAME:</div>
                <div>${review.reviewer.name}</div>
            </div>
            </div>
        </div>)
    `);
};

addReview($("#add-review-form"));

// function for Noty notifications for client side
const notification = function (type, message) {
  new Noty({
    theme: "relax",
    text: message,
    type: type,
    layout: "topRight",
    timeout: 1500,
  }).show();
};
