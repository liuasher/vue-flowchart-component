
const state = {

  pathData: {
    isShow: false
  },

  /** 选中的节点数据 */
  checkedNode: {},
  /** 表单数据 */
  configForm: {},
  /** 选中的实验 */
  checkedExperiment: {},
  /** 拖拽中的数据 */
  draggingNode: {
    id: '',
    style: {
      x: '',
      y: ''
    },
    positionX: '',
    positionY: ''
  },
  /**  */
  draggingPath: {
    isShow: false
  },
  /** 选择的元素 */
  selectedElement: {
    id: ''
  },
  /** 最近一次删除的节点 */
  currentDeletedNode: {},
  /** 最近一次删除的连线 */
  currentDeletedPaths: [],
  /** 删除连线时两边的节点 */
  pathRelated: {},

  /** nodes */
  nodes: [],

  /** paths */
  paths: []

}
const getters = {
  getPathData () {
    return state.pathData
  }
}
const mutations = {
  setPath (state, name) {
    state.pathData = name
  },
  setDraggingPath (state, path) {
    state.draggingPath = {...state.draggingPath, ...path}
  },
  /** 直接set所有path */
  setGlobalPaths (state, paths) {
    state.paths = paths
  },
  /** 直接set所有nodes */
  setGlobalNodes (state, nodes) {
    state.nodes = nodes
  },
  /** 设置拖拽中节点的信息 */
  setDraggingNode (state, payload) {
    state.draggingNode = payload
  },
  /** 被选中的元素 */
  setSelectedElement (state, element) {
    state.selectedElement = element
  },
  /** add一个node */
  addGlobalNode (state, node) {
    state.nodes = [...state.nodes, node]
  },
  /** add一条path */
  addGlobalPath (state, path) {
    let pathRelated = {}
    if (path instanceof Array) {
      state.paths = [...state.paths, ...path]
    } else {
      state.paths = [...state.paths, path]
    }
    state.nodes.forEach((node, index) => {
      for (const port of node.inPorts) {
        if (port.id === path.endPort) {
          pathRelated.endNode = node
        }
      }
      for (const port of node.outPorts) {
        if (port.id === path.startPort) {
          pathRelated.startNode = node
        }
      }
    })
    state.pathRelated = pathRelated
  },
  setcurrentDeletedNode (state, payload) {
    state.currentDeletedNode = payload
  },
  setcurrentDeletedPaths (state, payload) {
    state.currentDeletedPaths = payload
  }
}
const actions = {
  /** 需要同时设定 */
  setGlobal ({commit, state}, {nodes, paths}) {
    let dictionary = []

    paths.forEach((path, index) => {
      let sp = `${path.headNid}_s${path.headPortIndex}`
      let ep = `${path.tailNid}_e${path.tailPortIndex}`
      path.startPort = sp
      path.endPort = ep

      dictionary.push(sp)
      dictionary.push(ep)
    })

    nodes.forEach((node, index) => {
      console.log(node.style)
      let finalStyle = JSON.parse(node.style)

      let finalInPorts = finalStyle.inPort
      let finalOutPorts = finalStyle.outPort

      let ipt = []
      let opt = []

      finalInPorts.forEach(port => {
        // if (!port) return;
        let combine = `${node.id}_e${port}`
        let connected = (dictionary.indexOf(combine) !== -1)
        ipt.push({
          id: combine,
          isConnected: connected
        })
      })
      finalOutPorts.forEach(port => {
        // if (!port) return;
        let combine = `${node.id}_s${port}`
        let connected = (dictionary.indexOf(combine) !== -1)
        opt.push({
          id: combine,
          isConnected: connected
        })
      })
      node.style = finalStyle
      node.inPorts = ipt
      node.outPorts = opt
    })

    state.nodes = nodes
    state.paths = paths
  },
  /** 拖拽连线时候 */
  setPathData ({commit, state}, name) {
    commit('setPath', name)
  },
  /** delete一个node */
  deleteGlobalNode ({state, dispatch, commit}, deleteNode) {
    let rollback = []
    state.nodes.forEach((node, index) => {
      if (node.id === deleteNode.id) {
        // commit('setcurrentDeletedNode', state.nodes[index])
        state.currentDeletedNode = state.nodes[index]
        state.nodes.splice(index, 1)
        for (let index = state.paths.length - 1; index >= 0; index--) {
          let path = state.paths[index]
          let startPort = path.startPort.split('_')[0]
          let endPort = path.endPort.split('_')[0]
          if (startPort === deleteNode.id || endPort === deleteNode.id) {
            rollback.push(state.paths[index])
            dispatch('deleteGlobalPath', state.paths[index])
          }
        }
      }
    })
    state.currentDeletedPaths = rollback
  },

  /** delete一条path */
  deleteGlobalPath ({state, dispatch, commit}, deletePath) {
    let pathRelated = {}

    for (let index = state.paths.length - 1; index >= 0; index--) {
      let path = state.paths[index]

      if (path.endPort === deletePath.endPort && path.startPort === deletePath.startPort) {
        // dispatch('deleteGlobalPath', state.paths[index])
        console.log(88, deletePath)

        state.paths.splice(index, 1)
        state.nodes.forEach((node, index) => {
          for (const port of node.inPorts) {
            if (port.id === deletePath.endPort) {
              port.isConnected = false
              pathRelated.endNode = node
            }
          }
          for (const port of node.outPorts) {
            if (port.id === deletePath.startPort) {
              console.log(123, node.name)
              pathRelated.startNode = node
            }
          }
        })
        state.pathRelated = pathRelated
      }
    }
  },
  /** 返回上一步 */
  // currentDeletedNode:{},
  // currentDeletedPaths:[],

  setGlobalRollBack ({state, commit}) {
    // commit('addGlobalNode', state.currentDeletedNode)
    // commit('addGlobalPath', state.currentDeletedNode)
    // commit('setcurrentDeletedNode', {})
    // commit('setcurrentDeletedPaths', [])
  }

}
const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
export default store
