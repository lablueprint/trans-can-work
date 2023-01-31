import React, { useEffect, useState } from "react";
function NavigatorDashboard() {
  
  return (
    <div>
        <div>
            NavigatorDashboard
        </div>
        <div className="content">
            <div>

            </div>
            <div>
                <h1>Client Info</h1>
                <form>
                    <label for="authName">Authentic Name</label>
                    <input id="authName" placeholder="Kevin" type="text"></input>
                </form>
            </div>
        </div>
    </div>
  );
}
export default NavigatorDashboard;