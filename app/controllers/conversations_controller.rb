require "prawn"
class ConversationsController < ApplicationController
  # before_action :authenticate_user

  def index
    @user = current_user
    @users = User.all
    @conversations = Conversation.where('sender_id = ? OR recipient_id = ?', @user.id, @user.id)
    if !@conversations.empty?
      @conversation = Conversation.order("updated_at").last
      @message = @conversation.messages.new
      @messages = @conversation.messages
    end
    current_user.reset_unread()
  end

  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id], params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end

    redirect_to conversation_messages_path(@conversation)
  end

  def mute
    @conversation = Conversation.find params[:id]
    @other_user_id = @conversation.get_other_user(current_user).id
    @is_mute = params[:mute]
    if @is_mute
      @mute = @conversation.mutes.new
      @mute.muter_id = current_user.id
      @mute.muted_id = @other_user_id
      @mute.save
    else
      @mute = Mute.mute?(current_user.id, @other_user_id)
      @mute.destroy
    end
    respond_to do |format|
      format.html { redirect_to conversations_path(@conversation) }
      format.js { render content_type: 'text/javascript' }
    end
  end

  def recommend_to_peer_counselor
    user = User.find(params[:id])
    peer_counselor = User.where(peer_counselor: true).first
    User.create_friendship(user, peer_counselor)
    
    respond_to do |format|
      format.html { redirect_to conversations_path(@conversation) }
      format.js { render content_type: 'text/javascript' }
    end
  end

  def download_chat
    @user = current_user
    @conversation = Conversation.find params[:id]
    send_data generate_pdf(@user, @conversation),
              filename: "#{@conversation.get_other_user(@user).username}_conversation.pdf",
              type: "application/pdf"
  end

private
  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def generate_pdf(user, conversation)
    Prawn::Document.new do
      text "Your conversation with #{conversation.get_other_user(user).username}", align: :center, :size => 18
      float do
        text "#{conversation.get_other_user(user).username}", align: :left, :size => 14
      end
      text "#{user.username}", align: :right, :size => 14
      pad_bottom(5) { stroke_horizontal_rule }

      conversation.messages.each do |m|
        if m.user_id == user.id
          text "#{m.body}", align: :right
        else 
          text "#{m.body}", align: :left
        end
      end
    end.render
  end

end
