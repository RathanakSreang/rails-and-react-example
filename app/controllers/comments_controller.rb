class CommentsController < ApplicationController
  def comment
    comments = Comment.all
    comments.to_json
    layouts false
  end
  def create
    binding.pry
  end
end
