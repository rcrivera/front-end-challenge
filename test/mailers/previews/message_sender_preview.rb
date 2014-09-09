# Preview all emails at http://localhost:3000/rails/mailers/message_sender
class MessageSenderPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/message_sender/send_message
  def send_message
    MessageSender.send_message
  end

end
