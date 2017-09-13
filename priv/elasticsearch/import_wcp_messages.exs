alias Acs.Repo
alias Acs.Wcp.AppWcpMessage

max_id = Repo.one!( from msg in AppWcpMessage, select: max(msg.id))
Enum.map_every(0..max_id, 100, fn current_id ->
  query = 
    from msg in AppWcpMessage,
      select: %{app_id: msg.app_id, from: msg.from, to: msg.to, inserted_at: msg.inserted_at, msg_type: msg.msg_type, content: msg.content},
      limit: 100,
      where: msg.id >= ^current_id,
      order_by: [msg.id]

   messages = Repo.all(query)

   if messages && messages != [] do
    Enum.map(messages, fn msg ->
      from = Wcp.get_app_wcp_user(msg.app_id, msg.from)
      to = Wcp.get_app_wcp_user(msg.app_id, msg.to)
      ESWcpMessage.index(%{
        from: from,
        to: to,
        msg_type: msg.msg_type,
        content: msg.content,
        inserted_at: msg.inserted_at,
        app_id: msg.app_id})
    end)
   end
end)