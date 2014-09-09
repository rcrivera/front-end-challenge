class MessageSender < ActionMailer::Base
  default from: "roberto@devstud.io"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.message_sender.send_message.subject
  #
  def send_message(emails, message)
    @message = message
    mail(to: emails, subject: 'Yiftee Frontend Challenge')
  end
end
