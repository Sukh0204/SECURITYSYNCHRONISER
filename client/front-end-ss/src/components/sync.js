import React from 'react'
// import "./App.css"

const Sync = () =>{
    return(  
            <div className='jumbotron' >
                  <label for="formFile" class="form-label">Please Upload a CSV file</label>
        <div class="mb-3">

  <input class="form-control" type="file" id="formFile"></input>
</div>
<div className='row'>
<div className='col-lg-4 boxy'>
    <form>
                    <div className='form-group form-button'>
                    <input type='submit' name = 'signup' id='signup' className='form-submit' value='Submit'/>
                  </div>
                  </form>
                  </div>
                  <div className='col-lg-4 boxy'>
                    <div className='form-group form-button'>
                    <input type='submit' name = 'signup' id='signup' className='form-submit' value='Sync Manually'/>
                  </div>
                  </div>
                  <div className='col-lg-4 boxy'>
                    <div className='form-group form-button'>
                    <input type='submit' name = 'signup' id='signup' className='form-submit' value='View DB'/>
                  </div>
                  </div>
</div> 
 </div>
    )
}

export default Sync;