/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = function (RED) {
  "use strict";

  function NetatmoHomesData(config) {

    RED.nodes.createNode(this, config);
    this.auth = RED.nodes.getNode(config.auth);
    const node = this;

    this.on('input', function (msg) {
      const api = this.auth.api

      api.homesData((err, homes) => {
        msg.payload = { homes: homes };
        node.send(msg);
      });

      api.on("error", function (error) {
        console.error('homesData - ' + error);
      });

      api.on("warning", function (warning) {
        console.error('homesData - ' + warning);
      });
    });
  }

  RED.nodes.registerType("homesdata", NetatmoHomesData);
};