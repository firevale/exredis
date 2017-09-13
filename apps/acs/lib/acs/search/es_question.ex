defmodule Acs.Search.ESQuestion do 
  require Elasticsearch

  def index(question) do
    Elasticsearch.index(%{
      index: "customer_service",
      type: "questions",
      doc: question,
      id: question.id
    })
  end

  def update(id, question) do
    Elasticsearch.update(%{
      index: "customer_service",
      type: "questions",
      doc: question,
      id: id
    })
  end

  def delete(id) do
    Elasticsearch.delete(%{
      index: "customer_service",
      type: "questions",
      id: id
    })
  end

end