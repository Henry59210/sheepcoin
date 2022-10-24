<template>
  <div class="account">
    <div class="options-container">
      <el-menu
          :default-active="tabValue"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1f2138"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item v-for="item in accountOptions" :key="item.path" :index="item.path" @click.native.prevent="tabValue=item.path">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="content-container">
      <div class="user-info"><span style="font-size: 40px; margin-right: 10px"><i class="el-icon-user-solid"></i></span>{{ username }}</div>
      <div class="view-card"><el-button @click="viewCard">View Card</el-button></div>
      <div class="user-option-content">
        <router-view></router-view>
      </div>
    </div>
    <el-dialog
        title="Manage Cards"
        :visible.sync="dialogVisible"
        width="30%">
<!--delete confirm-->
      <el-dialog
          width="30%"
          title="Confirm"
          :visible.sync="confirmVisible"
          append-to-body
          @close="cancelDelete">
        <span>Are you sure to delete these cards?</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">Cancel</el-button>
        <el-button type="primary" @click="deleteCards()">Yes</el-button>
      </span>
      </el-dialog>
<!--add card-->
      <el-dialog
          width="30%"
          title="Confirm"
          :visible.sync="addCardVisible"
          @close="addCardVisible=false"
          append-to-body>
        <div>
          <el-form :rules="rule" :model="addCardForm">
            <el-form-item prop="cardNum">
              <el-input label="Card Number" v-model.number="addCardForm.cardNo" placeholder="Please enter your card Number"/>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addCardVisible=false">Cancel</el-button>
        <el-button type="primary" @click="addCard()" :disabled="addCard.cardNo===''">Yes</el-button>
      </span>
      </el-dialog>
      <div class="view-cards-panel" v-loading="loading">
        <div class="operates-place">
          <el-button type="text" v-if="!editing" @click="editCard">edit</el-button>
          <el-button type="text" v-if="editing" :disabled="deleteCardsList.length===0" @click="deleteConfirm">delete</el-button>
          <el-button type="text" v-if="editing" @click="cancelDelete">cancel</el-button>
        </div>
        <div class="cards-place">
          <el-card v-for="item in userCards" :key="item.id" shadow="hover" class="box-card">
            <div class="card-info">
              {{ item.cardNo.toString().replace(/.(?=.{4})/g, '*') }}
            </div>
            <div class="card-select-status">
              <el-checkbox v-if="editing" @change="checked=>selectCard(checked, item)"></el-checkbox>
            </div>
          </el-card>
          <el-card class="box-card add-place" @click.native.prevent="addCardVisible=true">
            <i class="el-icon-plus"></i>
          </el-card>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishEdit">Finish</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCard} from "@/api/simpleTrade";
import {addCard, deleteCards} from "@/api/account";

export default {
  name: "user-wallet",
  data() {
    return {
      username: '',
      dialogVisible: false,
      confirmVisible: false,
      addCardVisible: false,
      loading: false,
      editing: false,
      addCardForm: {
        cardNo: '',
      },
      userCards: [],
      deleteCardsList: [],
      rule: {
        cardNum: [
          { type: 'number', message: 'Must be number!'}
        ],
      }
    }
  },
  created() {
    this.getUsername()
  },
  computed: {
    accountOptions() {
      return this.$router.options.routes.filter(item => {
        return item.path === '/account'
      })[0].children[0].children
    },
    tabValue: {
      get() {
        console.log(this.$route.name)
        return this.$route.name.toLowerCase()
      },
      set(value) {
        this.$router.push(value)
      }
    }
  },
  watch: {
    addCardVisible:{
      handler(val){
        if(!val) this.addCardForm.cardNo=''
      }
    }
  },
  methods: {
    getUsername() {
      this.username = this.$store.getters.username
    },
    async viewCard() {
      this.dialogVisible = true
      this.loading = true
      let res = await getCard()
      this.userCards = res.data
      this.loading = false
    },
    editCard() {
      this.editing = true
    },
    selectCard(status, card) {
      if(status) this.deleteCardsList.push(card.id)
      else {
        let index = this.deleteCardsList.indexOf(card.id)
        if( index != -1 ) this.deleteCardsList.splice(index,1)
      }
      console.log(this.deleteCardsList)
    },
    cancelDelete() {
      this.editing = false
      this.confirmVisible = false
      this.deleteCardsList = []
    },
    deleteConfirm() {
      this.confirmVisible = true
    },
    async deleteCards() {
      let deleteList = []
      this.editing = false
      this.deleteCardsList.forEach(item=>{
        deleteList.push(deleteCards(item))
      })
      this.confirmVisible = false
      Promise.all(deleteList).then(async () => {
        this.$message.success('Cards delete success')
        await this.viewCard()
      })
      this.deleteCardsList = []
    },
    async addCard() {
      await addCard(this.addCardForm)
      this.addCardVisible = false
      await this.viewCard()
    },
    finishEdit() {
      this.dialogVisible = false
      this.deleteCardsList = []
      this.editing = false
    }
  }
}
</script>

<style scoped>
.account {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
}
.options-container {
  height: 60px;
}
.content-container {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
}
.user-info {
  height: 100px;
  line-height: 100px;
  font-size: 25px;
  padding: 0 10%;
  font-family: Hiragino Sans GB;
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
}
.view-card {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 10%;
  width:50%;
  text-align: right;
}
.user-option-content {
  position: absolute;
  top: 100px;
  bottom: 0;
  width: 100%;
}
.el-menu-demo {
  padding: 0 10%;
}
.view-cards-panel {
  height: 50vh;
}
.operates-place{
  text-align: right;
  height: 10%;
}
.cards-place {
  height: 90%;
}
.box-card {
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
}
.card-info {
  width: 70%;
  display: inline-block;
  font-size: 15px;
  letter-spacing: 4px
}
.card-select-status {
  text-align: right;
  width: 30%;
  display: inline-block;
}
.add-place {
  text-align: center;
  border: 2px #cbcbcb dashed;
}
.el-icon-plus {
  font-size: 30px;
}
/deep/.el-menu-item {
  font-size: 17px;
}
</style>
