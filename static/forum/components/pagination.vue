<template>
<nav v-show="pageCount > 1" class="pagination">
  <ul>
    <li> <a class="button" @click.prevent="selectPage(currentPage - 1)" :class="{'is-disabled': currentPage == 1}">{{ $t('forum.pagination.previous') }}</a>      </li>
    <li> <a class="button" @click.prevent="selectPage(1)" :class="{'is-primary': currentPage == 1}">1</a>      </li>
    <template v-if="pageCount >= 5">
      <template v-if="currentPage < 3">
        <li> <a class="button" @click.prevent="selectPage(2)" :class="{'is-primary': currentPage == 2}">2</a>
        </li>
        <li> <a class="button" @click.prevent="selectPage(3)" :class="{'is-primary': currentPage == 3}">3</a>
        </li>
        <li> <span>...</span> </li>
      </template>
      <template v-else>
        <template v-if="currentPage > pageCount - 2">
          <li> <span>...</span> </li>
          <li> <a class="button" @click.prevent="selectPage(pageCount - 2)" :class="{'is-primary': currentPage == pageCount - 2}">{{pageCount - 2}}</a>
          </li>
          <li> <a class="button" @click.prevent="selectPage(pageCount - 1)" :class="{'is-primary': currentPage == pageCount - 1}">{{pageCount - 1}}</a>
          </li>
        </template>
        <template v-else>
          <li> <span>...</span> </li>
          <li> <a class="button" @click.prevent="selectPage(currentPage - 1)">
                              {{currentPage - 1}} </a>
          </li>
          <li> <a class="button is-primary">{{currentPage}}</a>
          </li>
          <li> <a class="button" @click.prevent="selectPage(currentPage + 1)">{{currentPage + 1}}</a>
          </li>
          <li> <span>...</span> </li>
        </template>
      </template>
    </template>
    <template v-else>
      <li v-if="pageCount > 2"> <a class="button" @click.prevent="selectPage(2)" :class="{'is-primary': currentPage == 2}">2</a>
      </li>
      <li v-if="pageCount > 3"> <a class="button" @click.prevent="selectPage(3)" :class="{'is-primary': currentPage == 3}">3</a>
      </li>
      <li v-if="pageCount > 4"> <a class="button" @click.prevent="selectPage(4)" :class="{'is-primary': currentPage == 4}">4</a>
      </li>
    </template>
    <li> <a class="button" :class="{'is-primary': currentPage == pageCount}" @click.prevent="selectPage(pageCount)">{{ pageCount }}</a>        </li>
    <li> <a class="button" :class="{'is-disabled': currentPage == pageCount}" @click.prevent="selectPage(currentPage + 1)">{{ $t('forum.pagination.next') }}</a>        </li>
  </ul>
</nav>
</template>
<script>
export default {
  props: {
    pageCount: {
      type: Number,
      default: 1
    },

    currentPage: {
      type: Number,
      default: 1
    },

    onPageChange: {
      type: Function,
      default: undefined
    }
  },

  methods: {
    selectPage: function(page) {
      if (this.onPageChange) {
        this.onPageChange(page)
      }
    }
  }
}
</script>
