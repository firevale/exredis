defmodule Elasticsearch do
  require Logger
  alias Elasticsearch.Worker

  def ensure_can_start do
    :ok = Application.ensure_started(:inets)
    :ok = Application.ensure_started(:poolboy)
  end

  def transaction(fun), do: :poolboy.transaction(:elasticsearch, fun)

  def create_index(name, settings \\ nil, mappings \\ nil) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      body = case {mappings, settings} do 
               {nil, nil} -> nil
               {nil, %{}} -> %{settings: settings}
               {%{}, nil} -> %{mappings: mappings}
               {%{}, %{}} -> %{settings: settings, mappings: mappings}
             end
      Worker.request %{worker: worker, 
                       method: :put, 
                       path: [name], 
                       body: body}
    end
  end

  def delete_index(name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request(%{worker: worker, 
                       method: :delete, 
                       path: [name]})
    end
  end

  def is_index?(name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      case Worker.request(%{worker: worker, 
                            method: :head, 
                            path: [name]}) do
        {:ok, _} -> true
        _ -> false
      end
    end
  end

  def get_index(name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :get, 
                       path: [name]}
    end
  end    

  def open_index(name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :post, 
                       path: [name, "_open"]}
    end
  end   

  def close_index(name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :post, 
                       path: [name, "_close"]}
    end
  end   

  def is_type?(index, name) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      case Worker.request %{worker: worker, 
                            method: :head, 
                            path: [index, name]} do
        {:ok, _} -> true
        _ -> false
      end
    end
  end

  def delete_type(index, type) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :delete, 
                       path: [index, type]}
    end
  end

  def index(%{index: nil}), do: {:error, "invalid index"}
  def index(%{index: ""}), do: {:error, "invalid index"}
  def index(%{type: nil}), do: {:error, "invalid type"}
  def index(%{type: ""}), do: {:error, "invalid type"}
  def index(%{index: index, type: type, doc: doc = %{}, params: params, id: id}) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      _index(worker, index, type, doc, id, params)
    end   
  end
  defp _index(worker, index, type, doc, nil, params) do  
    Worker.request %{worker: worker, 
                     method: :post, 
                     path: [index, type], 
                     body: doc,
                     params: params}
  end
  defp _index(worker, index, type, doc, id, params) do  
    Worker.request %{worker: worker, 
                     method: :put, 
                     path: [index, type, id], 
                     body: doc,
                     params: params}
  end

  def update(%{index: nil}), do: {:error, "invalid index"}
  def update(%{index: ""}), do: {:error, "invalid index"}
  def update(%{type: nil}), do: {:error, "invalid type"}
  def update(%{type: ""}), do: {:error, "invalid type"}
  def update(%{id: nil}), do: {:error, "invalid document id"}
  def update(%{id: ""}), do: {:error, "invalid document id"}
  def update %{index: index, type: type, doc: doc = %{}, params: params, id: id} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      _update(worker, index, type, doc, id, params)
    end   
  end
  defp _update(worker, index, type, doc, id, params) do 
    Worker.request %{worker: worker, 
                     method: :post, 
                     path: [index, type, id, "_update"], 
                     body: doc,
                     params: params}    
  end

  def delete(%{index: nil}), do: {:error, "invalid index"}
  def delete(%{index: ""}), do: {:error, "invalid index"}
  def delete(%{type: nil}), do: {:error, "invalid type"}
  def delete(%{type: ""}), do: {:error, "invalid type"}
  def delete(%{id: nil}), do: {:error, "invalid document id"}
  def delete(%{id: ""}), do: {:error, "invalid document id"}
  def delete %{index: index, type: type, params: params, id: id} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      _delete(worker, index, type, id, params)
    end   
  end
  defp _delete(worker, index, type, id, params) do 
    Worker.request %{worker: worker, 
                     method: :delete, 
                     path: [index, type, id], 
                     params: params}    
  end

  def get(%{index: nil}), do: {:error, "invalid index"}
  def get(%{index: ""}), do: {:error, "invalid index"}
  def get(%{type: nil}), do: {:error, "invalid type"}
  def get(%{type: ""}), do: {:error, "invalid type"}
  def get %{index: index, type: type, id: id, params: params} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :get, 
                       path: [index, type, id, "_source"],
                       params: params}    
    end 
  end

  def mget(%{index: nil}), do: {:error, "invalid index"}
  def mget(%{index: ""}), do: {:error, "invalid index"}
  def mget(%{type: nil}), do: {:error, "invalid type"}
  def mget(%{type: ""}), do: {:error, "invalid type"}
  def mget(index, type, ids) when is_list(ids) do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :get, 
                       path: [index, type, "_mget"],
                       body: %{
                         ids: ids
                       }}    
    end 
  end

  def search(%{index: nil}), do: {:error, "invalid index"}
  def search(%{index: ""}), do: {:error, "invalid index"}
  def search(%{type: nil}), do: {:error, "invalid type"}
  def search(%{type: ""}), do: {:error, "invalid type"}
  def search %{index: index, type: type, query: query, params: params} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      _search(worker, index, type, query, params)
    end   
  end
  defp _search(worker, index, type, query, params) do 
    Worker.request %{worker: worker, 
                     method: :post, 
                     path: [index, type, "_search"], 
                     body: query,
                     params: params}    
  end

  def get_mapping(%{index: nil}), do: {:error, "invalid index"}
  def get_mapping(%{index: ""}), do: {:error, "invalid index"}
  def get_mapping(%{type: nil}), do: {:error, "invalid type"}
  def get_mapping(%{type: ""}), do: {:error, "invalid type"}
  def get_mapping %{index: index, type: type} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :get, 
                       path: [index, "_mapping", type]}    
    end   
  end

  def put_mapping(%{index: nil}), do: {:error, "invalid index"}
  def put_mapping(%{index: ""}), do: {:error, "invalid index"}
  def put_mapping(%{type: nil}), do: {:error, "invalid type"}
  def put_mapping(%{type: ""}), do: {:error, "invalid type"}
  def put_mapping %{index: index, type: type, mapping: mapping} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      Worker.request %{worker: worker, 
                       method: :put, 
                       path: [index, "_mapping", type],
                       body: mapping,
                       params: %{ignore_conflicts: true}}    
    end   
  end

  def count(%{index: nil}), do: {:error, "invalid index"}
  def count(%{index: ""}), do: {:error, "invalid index"}
  def count %{index: index, type: type, query: query, params: params} do 
    :poolboy.transaction :elasticsearch, fn(worker) ->
      _count(worker, index, type, query, params)
    end   
  end
  defp _count(worker, index, type, query, params) do 
    path = case type do 
            nil -> 
              [index, "_count"]
            "" -> 
              [index, "_count"]
            _ ->
              [index, type, "_count"]
           end

    Worker.request %{worker: worker, 
                     method: :post, 
                     path: path, 
                     body: query,
                     params: params}    
  end
end