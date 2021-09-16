export default function ({store, route, redirect, params, query, req, res}) {
  // {store, route, redirect, params, query, req, res} 從 context 解構 
  if (store.state.authToken === '' || store.state.authToken === undefined) {
    return redirect('/');
  }  
}